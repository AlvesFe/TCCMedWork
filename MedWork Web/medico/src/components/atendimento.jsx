import React, { Component } from 'react';
import InputMask from 'react-input-mask';
import cadastrarReceita from '../main/api/cadastrarReceita';
import getPaciente from '../main/api/getPaciente';
import getRemedio from '../main/api/getRemedio';
import { jsPDF } from 'jspdf/dist/jspdf.umd';
import Logo from '../images/logotipo.png'
import Menu from './template/menu'

export default class Atendimento extends Component {

    constructor() {
        super()
        this.state = {
            cpf: "",
            codigoMedicamento: "",
            dosagem: "",
            quantidade: "",
            validade: "",
            orientacoes: ""
        }
        this.onChange = (e) => {
            const state = Object.assign({}, this.state)
            const campo = e.target.name
            state[campo] = e.target.value
            this.setState(state)
        }
        this.onSubmit = (e) => {
            e.preventDefault()
            console.log(this.state)
            getPaciente(this.state.cpf).then(response => {
                // 32052850007
                getRemedio(this.state.codigoMedicamento).then(result => {

                    cadastrarReceita(this.state, response, result).then(res => {
                        if (res) {
                            GerarPdf(this.state, response, result)
                            this.setState({
                                cpf: "",
                                codigoMedicamento: "",
                                dosagem: "",
                                quantidade: "",
                                validade: "",
                                orientacoes: ""
                            })
                        }
                    });
                })
            })

        }

        const GerarPdf = (state, Paciente, Medicamento) => {
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
            doc.text(20, 90, 'Nascimento: ' + Paciente.dt_Nascimento.slice(0, -14));
            doc.text(20, 100, 'Alergias: ' + Paciente.alergia);
            doc.text(85, 120, 'MEDICAMENTO');
            doc.text(20, 140, 'Remédio: ' + Medicamento.nome);
            doc.text(20, 150, 'Tarja: ' + Medicamento.tarja);
            doc.text(20, 160, 'Descrição: ' + Medicamento.descricao);
            doc.text(20, 170, 'Preco: R$' + Medicamento.preco);
            doc.text(95, 190, 'MEDICO');
            doc.text(20, 210, 'Medico: ' + userData.nome);
            doc.text(20, 220, 'CRM: ' + userData.nome);
            doc.text(20, 230, 'Especialidade: ' + userData.especialidade);
            doc.text(20, 240, 'Data Nascimento: ' + userData.dt_Nascimento.slice(0, -14));
            doc.text(20, 270, 'Ass:_________________________________________________');
            doc.text(90, 280, 'Carimbo: ______________________');
            doc.save(`${Paciente.nome}-Receita-${Date.now()}`);
        }
    }

    render() {

        return (
            <div className='row bg-white'>
                <Menu />
                <div className='container col-md-8 col-lg-9 pt-4 animate__animated animate__fadeIn animate__fast'>
                    <h2 className='text-center font-weight-light'>ATENDIMENTO</h2>

                    <div className='row justify-content-center'>
                        <div className="col-12 form-row">
                            <div className='form-group col-12 py-1'>
                                <label htmlFor="cpf" className='font-weight-bold mb-0'>CPF</label>
                                <InputMask mask="999.999.999-99" className="form-control form-control-sm" id="cpf" placeholder='xxx.xxx.xxx-xx' name='cpf' value={this.state.cpf} onChange={this.onChange} />
                            </div>
                            <div className='col-12'>
                                <hr />
                            </div>
                            <div className='form-group col-4 py-1'>
                                <label htmlFor="codigoMedicamento" className='font-weight-bold mb-0'>Codigo do medicamento</label>
                                <input type="text" className=" form-control form-control-sm" id="codigoMedicamento" placeholder='Codigo do medicamento' name="codigoMedicamento" value={this.state.codigoMedicamento} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-3 py-1'>
                                <label htmlFor="dosagem" className='font-weight-bold mb-0'>Dosagem</label>
                                <input type="text" className="form-control form-control-sm" id="dosagem" placeholder='Ex: 100mg' name="dosagem" value={this.state.dosagem} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-3 py-1'>
                                <label htmlFor="quantidade" className='font-weight-bold mb-0'>Quantidade</label>
                                <input type="text" className="form-control form-control-sm" id="quantidade" placeholder='3 caixas' name="quantidade" value={this.state.quantidade} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-2 py-1'>
                                <label htmlFor="crm" className='font-weight-bold mb-0'>Validade</label>
                                <InputMask mask="99/99/9999" className="form-control form-control-sm" id="validade" placeholder='dd/mm/aaaa' name="validade" value={this.state.validade} onChange={this.onChange} />
                            </div>

                            <div className='form-group col-12 py-1'>
                                <label htmlFor="orientacoes" className='font-weight-bold mb-0'>Orientações</label>
                                <textarea className="form-control form-control-sm" id="orientacoes" rows='5' placeholder='Ex: tomar a cada 8 horas durante 3 dias' name='orientacoes' value={this.state.orientacoes} onChange={this.onChange} />
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