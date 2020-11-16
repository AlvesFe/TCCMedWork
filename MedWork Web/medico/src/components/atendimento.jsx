import React, { Component } from 'react';
import Menu from './template/menu'

export default class Atendimento extends Component {

    constructor() {
        super()
        this.state = {
            nomePaciente: "",
            dataNascimento:"",
            tipoSanguineo:"",
            email: "",
            celular: "",
            cpf: "",
            rg: "",
            alergia: "",
            sintomas:"",
            nomeMedicamento: "",
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
                            <div className='form-group col-6 py-1'>
                                <label htmlFor="alergia" className='font-weight-bold mb-0'>Alergia a medicamentos ou remédios</label>
                                <textarea className="form-control form-control-sm" id="alergia" placeholder='Ex: Nenhuma alergia' name='alergia' value={this.state.alergia} onChange={this.onChange}/>
                            </div>
                            <div className='form-group col-6 py-1'>
                                <label htmlFor="sintomas" className='font-weight-bold mb-0'>Sintomas iniciais</label>
                                <textarea className="form-control form-control-sm" id="sintomas" placeholder='Ex: dor de cabeça' name='sintomas' value={this.state.sintomas} onChange={this.onChange}/>
                            </div>
                            <div className='col-12'>
                                <hr/>
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
                                <label htmlFor="crm" className='font-weight-bold mb-0'>Validade</label>
                                <input type="text" className="form-control form-control-sm" id="crm" placeholder='dd/mm/aaaa' name="crm" value={this.state.validade} onChange={this.onChange} />
                            </div>

                            <div className='form-group col-12 py-1'>
                                <label htmlFor="orientacoes" className='font-weight-bold mb-0'>Orientações</label>
                                <textarea className="form-control form-control-sm" id="orientacoes" rows='5' placeholder='Ex: tomar a cada 8 horas durante 3 dias' name='orientacoes' value={this.state.orientacoes} onChange={this.onChange}/>
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