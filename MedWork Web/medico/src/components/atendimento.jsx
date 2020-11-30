import React, { Component } from 'react';
import InputMask from 'react-input-mask';
import cadastrarReceita from '../main/api/cadastrarReceita';
import getPaciente from '../main/api/getPaciente';
import getRemedio from '../main/api/getRemedio';
import { jsPDF } from 'jspdf/dist/jspdf.umd';
import Logo from '../images/logotipo.png'
import Menu from './template/menu'
import ProcurarPacienteErro from './template/ProcurarPacienteErro'

export default class Atendimento extends Component {

    constructor() {
        super()
        this.state = {
            cpf: "",
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
            console.log(this.state)
            getPaciente(this.state.cpf).then(response => {
                // 32052850007
                getRemedio(this.state.codigoMedicamento).then(result => {

                    cadastrarReceita(this.state, response, result).then(res => {
                        if (res) {
                            GerarPdf(this.state, response, result)
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
        this.buscarDadosPaciente = (e) => {
            e.preventDefault()

            if (false) {
                this.setState({
                    procurarPacienteErro: "col-12 animate__animated animate__fadeIn animate__fast"
                })
                this.setState({
                    apenasLeitura: "true"
                })
            }
            else {
                this.setState({
                    procurarPacienteErro: "d-none"
                })
                this.setState({
                    dadosPaciente: ""
                })
                this.setState({
                    apenasLeitura: ""
                })
            }
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
                                <input type="text" disabled={this.state.apenasLeitura} className=" form-control form-control-sm" id="codigoMedicamento" placeholder='Codigo do medicamento' name="codigoMedicamento" value={this.state.codigoMedicamento} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-3 py-1'>
                                <label htmlFor="dosagem" className='font-weight-bold mb-0'>Dosagem</label>
                                <input type="text" disabled={this.state.apenasLeitura} className="form-control form-control-sm" id="dosagem" placeholder='Ex: 100mg' name="dosagem" value={this.state.dosagem} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-3 py-1'>
                                <label htmlFor="quantidade" className='font-weight-bold mb-0'>Quantidade</label>
                                <input type="text" disabled={this.state.apenasLeitura} className="form-control form-control-sm" id="quantidade" placeholder='3 caixas' name="quantidade" value={this.state.quantidade} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-2 py-1'>
                                <label htmlFor="crm" className='font-weight-bold mb-0'>Validade</label>
                                <InputMask mask="99/99/9999" disabled={this.state.apenasLeitura} className="form-control form-control-sm" id="validade" placeholder='dd/mm/aaaa' name="validade" value={this.state.validade} onChange={this.onChange} />
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