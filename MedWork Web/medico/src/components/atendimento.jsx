import React, { Component } from 'react';
import InputMask from 'react-input-mask';
import cadastrarReceita from '../main/api/cadastrarReceita';
import getPaciente from '../main/api/getPaciente';
import getRemedio from '../main/api/getRemedio';
import { jsPDF } from 'jspdf/dist/jspdf.umd';
import Logo from '../images/logotipo.png'
import Menu from './template/menu'
import ProcurarPacienteErro from './template/ProcurarPacienteErro'
import cadastrarConsulta from '../main/api/cadastrarConsulta';

export default class Atendimento extends Component {

    constructor() {
        super()
        this.state = {
            cpf: "",
            NomePaciente: "",
            tipoSanguineo: "",
            alergias: "",
            codigoMedicamento: "",
            dosagem: "",
            quantidade: "",
            validade: "",
            orientacoes: "",
            dadosPaciente: "true",
            apenasLeitura: "true",
            procurarPacienteErro: "d-none",
            height: window.innerHeight
        }
        window.onresize = () => {
            this.setState({
                ...this.state, height: window.innerHeight
            })
        }
        this.onChange = (e) => {
            const state = Object.assign({}, this.state)
            const campo = e.target.name
            state[campo] = e.target.value
            this.setState(state)
        }
        this.onSubmit = (e) => {
            e.preventDefault()
            getPaciente(this.state.cpf).then(response => {
                getRemedio(this.state.codigoMedicamento).then(result => {
                    cadastrarReceita(this.state, response, result).then(res => {
                        if (res.mensagem) {
                            const stringData = localStorage.getItem('user_data')
                            const userData = JSON.parse(stringData)
                            const consulta = {
                                descricao: this.state.orientacoes,
                                dt_Consulta: new Date().toISOString().slice(0, -14),
                                fk_id_Paciente: response.id_Paciente,
                                fk_id_Medico: userData.id_Medico,
                                fk_id_Receita: res.id_Receita
                            }
                            cadastrarConsulta(consulta)
                            GerarPdf(response, result)
                            this.setState({
                                ...this.state,
                                cpf: "",
                                NomePaciente: "",
                                tipoSanguineo: "",
                                alergias: "",
                                codigoMedicamento: "",
                                dosagem: "",
                                quantidade: "",
                                validade: "",
                                orientacoes: "",
                            })
                        }
                    });
                })
            })

        }
        function ConverterData(data) {
            data = Date.parse(data);
            data = new Date(data);
            return ((data.getDate())) + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear();
        }
        const GerarPdf = (Paciente, Medicamento) => {

            const stringData = localStorage.getItem('user_data')
            const userData = JSON.parse(stringData)
            let fotoPaciente = new Image();
            fotoPaciente.src = `/api/uploads/paciente/${Paciente.foto}`;

            const doc = new jsPDF('p');
            doc.addImage(Logo, 'png', 80, 0, 50, 50);
            doc.addImage(fotoPaciente, 'png', 150, 60, 50, 50);
            doc.text(90, 50, 'PACIENTE');
            doc.text(20, 70, 'Paciente: ' + Paciente.nome);
            doc.text(20, 80, 'CPF: ' + Paciente.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"));
            doc.text(20, 90, 'Nascimento: ' + ConverterData(Paciente.dt_Nascimento));
            doc.text(20, 100, 'Alergias: ' + Paciente.alergia);
            doc.text(85, 120, 'MEDICAMENTO');
            doc.text(20, 140, 'Remédio: ' + Medicamento.nome);
            doc.text(20, 150, 'Tarja: ' + Medicamento.tarja);
            doc.text(20, 160, 'Descrição: ' + Medicamento.descricao);
            doc.text(20, 170, 'Orientações: ' + this.state.orientacoes);
            doc.text(95, 190, 'MEDICO');
            doc.text(20, 220, 'Medico: ' + userData.nome);
            doc.text(20, 230, 'CRM: ' + userData.crm);
            doc.text(20, 240, 'Especialidade: ' + userData.especialidade);
            doc.text(20, 250, 'Data Nascimento: ' + ConverterData(userData.dt_Nascimento));
            doc.text(30, 270, '______________________  ______________________');
            doc.text(55, 280, 'Assinatura');
            doc.text(128, 280, 'Carimbo');
            // doc.output('blob');
            doc.save(`${Paciente.nome}-Receita-${Date.now()}`);
        }
        this.buscarDadosPaciente = (e) => {
            e.preventDefault()
            getPaciente(this.state.cpf).then(res => {
                if (res != false) {
                    this.setState({
                        NomePaciente: res.nome,
                        tipoSanguineo: res.tp_sanguineo,
                        alergias: res.alergia,
                        apenasLeitura: "",
                        dadosPaciente: "",
                        procurarPacienteErro: "d-none"
                    })
                }
                else {
                    this.setState({
                        procurarPacienteErro: "col-12 animate__animated animate__fadeIn animate__fast",
                        apenasLeitura: "true"
                    })
                }

            })

        }
    }

    render() {

        return (
            <div className='row bg-white'>
                <Menu />
                <div className='container col-md-8 col-lg-9 pt-4 animate__animated animate__fadeIn animate__fast'>
                    <h2 className='text-center font-weight-light'>ATENDIMENTO</h2>

                    <div className='row justify-content-center'>
                        <div className="col-12 form-row justify-content-center">


                            <div className="col-12 form-row">
                                <div className={this.state.procurarPacienteErro}>
                                    <ProcurarPacienteErro />
                                </div>
                                <div className='col-4'>
                                    <label htmlFor="cpf" className='font-weight-bold mb-0'>CPF</label>
                                    <div className="input-group mb-3">
                                        <InputMask mask="999.999.999-99" type="text" className="form-control " placeholder='___.___.___-__' aria-describedby="button-buscar" id="cpf" name='cpf' value={this.state.cpf} onChange={this.onChange} />
                                        <div className="input-group-append">
                                            <button className="btn-roxo" type="button" id="button-buscar" onClick={this.buscarDadosPaciente}>Buscar</button>
                                        </div>
                                    </div>
                                </div>
                                <div className='form-group col-4' hidden={this.state.dadosPaciente}>
                                    <label htmlFor="NomePaciente" className='font-weight-bold mb-0'>Nome do paciente</label>
                                    <input disabled={true} type="text" className=" form-control " id="NomePaciente" placeholder='Nome do Paciente' name="NomePaciente" value={this.state.NomePaciente} onChange={this.onChange} />
                                </div>
                                <div className='form-group col-4' hidden={this.state.dadosPaciente}>
                                    <label htmlFor="TipoSanguineo" className='font-weight-bold mb-0'>Tipo Sanguíneo</label>
                                    <input disabled={true} type="text" className=" form-control " id="TipoSanguineo" placeholder='Tipo sanguíneo' name="tipoSanguineo" value={this.state.tipoSanguineo} onChange={this.onChange} />
                                </div>
                                <div className='form-group col-12' hidden={this.state.dadosPaciente}>
                                    <label htmlFor="alergias" className='font-weight-bold mb-0'>Alergias</label>
                                    <textarea disabled={true} name="alergias" placeholder='Alergias' id='alergias' className='form-control' id="Alergias" cols="30" rows="2" value={this.state.alergias} onChange={this.onChange} ></textarea>
                                </div>
                            </div>

                            <div className='col-12'>
                                <hr />
                            </div>
                            <div className='form-group col-4 py-1'>
                                <label htmlFor="codigoMedicamento" className='font-weight-bold mb-0'>Codigo do medicamento</label>
                                <input type="number" disabled={this.state.apenasLeitura} className=" form-control form-control-sm" id="codigoMedicamento" placeholder='Codigo do medicamento' name="codigoMedicamento" value={this.state.codigoMedicamento} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-3 py-1'>
                                <label htmlFor="dosagem" className='font-weight-bold mb-0'>Dosagem</label>
                                <input type="text" disabled={this.state.apenasLeitura} className="form-control form-control-sm" id="dosagem" placeholder='Ex: 100mg' name="dosagem" value={this.state.dosagem} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-3 py-1'>
                                <label htmlFor="quantidade" className='font-weight-bold mb-0'>Quantidade</label>
                                <input type="number" disabled={this.state.apenasLeitura} className="form-control form-control-sm" id="quantidade" placeholder='Ex: 3 caixas' name="quantidade" value={this.state.quantidade} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-2 py-1'>
                                <label htmlFor="crm" className='font-weight-bold mb-0'>Validade</label>
                                <input type='date' disabled={this.state.apenasLeitura} className="form-control form-control-sm" id="validade" placeholder='dd/mm/aaaa' name="validade" value={this.state.validade} onChange={this.onChange} />
                            </div>

                            <div className='form-group col-12 py-1'>
                                <label htmlFor="orientacoes" className='font-weight-bold mb-0'>Orientações</label>
                                <textarea disabled={this.state.apenasLeitura} className="form-control form-control-sm" id="orientacoes" rows='5' placeholder='Ex: tomar a cada 8 horas durante 3 dias' name='orientacoes' value={this.state.orientacoes} onChange={this.onChange} />
                            </div>

                        </div>
                        <div className='col-12 text-center py-2'>
                            <button className='btn-roxo' onClick={this.onSubmit} >GERAR PRESCRIÇÃO</button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}