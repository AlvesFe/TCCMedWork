import React, { Component } from 'react';
import Menu from './template/menu'

export default class PesquisaEfetivada extends Component {

    constructor() {
        super()
        this.state = {
            nomeMedico: "",
            crm:"",
            nomePaciente: "",
            dataNascimento: "",
            tipoSanguineo: "",
            status: "",
            endereco: "",
            cpf: "",
            rg: "",
            email: "",
            celular: "",
            telefone: "",
            alergia: "",
            height: window.innerHeight
        }
        window.onresize = () =>{
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
        }
    }

    render() {

        return (
            <div className='row bg-white'>
                <Menu />
                <div className='container col-md-8 col-lg-9 pt-4 animate__animated animate__fadeIn animate__fast overflow-auto' style={{height: this.state.height}}>
                    <h2 className='text-center font-weight-light'>PRESCRIÇÃO</h2>

                    <div className='row justify-content-center py-3'>
                        <div className="col-12 form-row">
                            <div className='form-group col-7 py-1'>
                                <label htmlFor="nomeMedico" className='font-weight-bold mb-0'>Dr.</label>
                                <input type="text" className="form-control form-control-sm" id="nomeMedico" placeholder='Nome do médico' name="nomeMedico" value={this.state.nomeMedico} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-5 py-1'>
                                <label htmlFor="crm" className='font-weight-bold mb-0'>CRM</label>
                                <input type="text" className="form-control form-control-sm" id="crm" placeholder='01.234-SP' name='crm' value={this.state.crm} onChange={this.onChange} />
                            </div>

                            <div className='col-12'>
                                <hr />
                            </div>

                            <div className='form-group col-7 py-1'>
                                <label htmlFor="nomePaciente" className='font-weight-bold mb-0'>Nome do paciente</label>
                                <input type="text" className="form-control form-control-sm" id="nomePaciente" placeholder='Fulano de tal' name="nomePaciente" value={this.state.nomePaciente} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-3 py-1'>
                                <label htmlFor="dataNascimento" className='font-weight-bold mb-0'>Data de nascimento</label>
                                <input type="text" className="form-control form-control-sm" id="dataNascimento" placeholder='DD/MM/AAAA' name='dataNascimento' value={this.state.dataNascimento} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-2 py-1'>
                                <label htmlFor="tipoSanguineo" className='font-weight-bold mb-0'>Tipo sanguíneo</label>
                                <input type="text" className="form-control form-control-sm" id="tipoSanguineo" placeholder='O+' name='tipoSanguineo' value={this.state.tipoSanguineo} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-5 py-1'>
                                <label htmlFor="email" className='font-weight-bold mb-0'>E-mail</label>
                                <input type="text" className="form-control form-control-sm" id="email" placeholder='email@paciente.com' name='email' value={this.state.email} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-3 py-1'>
                                <label htmlFor="celular" className='font-weight-bold mb-0'>Celular</label>
                                <input type="text" className="form-control form-control-sm" id="celular" placeholder='(xx) xxxxx-xxxx' name='celular' value={this.state.celular} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-2 py-1'>
                                <label htmlFor="cpf" className='font-weight-bold mb-0'>CPF</label>
                                <input type="text" className="form-control form-control-sm" id="cpf" placeholder='xxx.xxx.xxx-xx' name='cpf' value={this.state.cpf} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-2 py-1'>
                                <label htmlFor="rg" className='font-weight-bold mb-0'>RG</label>
                                <input type="text" className="form-control form-control-sm" id="rg" placeholder='xx.xxx.xxx-x' name='rg' value={this.state.rg} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-4 py-1'>
                                <label htmlFor="medicamento" className='font-weight-bold mb-0'>Nome do medicamento</label>
                                <input type="text" className=" form-control form-control-sm" id="medicamento" placeholder='Nome do medicamento' name="medicamento" value={this.state.nomeMedicamento} onChange={this.onChange} />
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
                                <label htmlFor="validade" className='font-weight-bold mb-0'>Validade</label>
                                <input type="text" className="form-control form-control-sm" id="validade" placeholder='dd/mm/aaaa' name="crm" value={this.state.validade} onChange={this.onChange} />
                            </div>

                            <div className='form-group col-12 py-1'>
                                <label htmlFor="orientacoes" className='font-weight-bold mb-0'>Orientações</label>
                                <textarea className="form-control form-control-sm" id="orientacoes" rows='5' placeholder='Ex: tomar a cada 8 horas durante 3 dias' name='orientacoes' value={this.state.orientacoes} onChange={this.onChange} />
                            </div>
                        </div>
                        <div className='col-12 text-center py-2'>
                            <button className='btn-roxo' onClick={this.onSubmit} ><i className="envelope outline icon"></i>ENVIAR P/ PACIENTE</button>
                            <a href='#/encaminhamento' className='btn-roxo mx-2' ><i className="print icon"></i>IMPRIMIR</a>
                            <button className='btn-roxo' onClick={this.onSubmit} > <i className="check icon"></i>FINALIZAR ATENDIMENTO</button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}