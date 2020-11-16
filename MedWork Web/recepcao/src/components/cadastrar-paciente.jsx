import React, { Component } from 'react';
import Menu from './template/menu'

export default class CadastrarPaciente extends Component {

    constructor() {
        super()
        this.state = {
            nomePaciente: "",
            dataNascimento:"",
            tipoSanguineo:"",
            status: "",
            endereco: "",
            cpf: "",
            rg: "",
            email: "",
            celular: "",
            telefone: "",
            senhaProvisoria: "",
            alergia: ""
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
                    <h2 className='text-center font-weight-light'>CADASTRAR PACIENTE</h2>

                    <div className='row justify-content-center py-3'>
                        <div className="col-12 py-5 form-row">
                            <div className='form-group col-5 py-1'>
                                <label htmlFor="nomePaciente" className='font-weight-bold mb-0'>Nome</label>
                                <input type="text" className="form-control form-control-lg" id="nomePaciente" placeholder='Nome' name="nomePaciente" value={this.state.nomePaciente} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-3 py-1'>
                                <label htmlFor="dataNascimento" className='font-weight-bold mb-0'>Data de nascimento</label>
                                <input type="text" className="form-control form-control-lg" id="dataNascimento" placeholder='DD/MM/AAAA' name='dataNascimento' value={this.state.dataNascimento} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-2 py-1'>
                                <label htmlFor="tipoSanguineo" className='font-weight-bold mb-0'>Tipo sanguíneo</label>
                                <input type="text" className="form-control form-control-lg" id="tipoSanguineo" placeholder='O+' name='tipoSanguineo' value={this.state.tipoSanguineo} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-2 py-1'>
                                <label htmlFor="status" className='font-weight-bold mb-0'>Status</label>
                                <select className="form-control form-control-lg" id="status" name='status' value={this.state.status} onChange={this.onChange}>
                                    <option value="">Escolha</option>
                                    <option value="1">Ativo</option>
                                    <option value="0">Inativo</option>
                                </select>
                            </div>
                            <div className='form-group col-6 py-1'>
                                <label htmlFor="endereco" className='font-weight-bold mb-0'>Endereço</label>
                                <input type="text" className="form-control form-control-lg" id="endereco" placeholder='Ex: Avenida paulista, 2222, São Paulo - SP' name='endereco' value={this.state.endereco} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-3 py-1'>
                                <label htmlFor="cpf" className='font-weight-bold mb-0'>CPF</label>
                                <input type="text" className="form-control form-control-lg" id="cpf" placeholder='xxx.xxx.xxx-xx' name='cpf' value={this.state.cpf} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-3 py-1'>
                                <label htmlFor="rg" className='font-weight-bold mb-0'>RG</label>
                                <input type="text" className="form-control form-control-lg" id="rg" placeholder='xx.xxx.xxx-x' name='rg' value={this.state.rg} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-6 py-1'>
                                <label htmlFor="email" className='font-weight-bold mb-0'>E-mail</label>
                                <input type="text" className="form-control form-control-lg" id="email" placeholder='email@medwork.com' name='email' value={this.state.email} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-2 py-1'>
                                <label htmlFor="celular" className='font-weight-bold mb-0'>Celular</label>
                                <input type="text" className="form-control form-control-lg" id="celular" placeholder='(xx) xxxxx-xxxx' name='celular' value={this.state.celular} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-2 py-1'>
                                <label htmlFor="telefone" className='font-weight-bold mb-0'>Telefone</label>
                                <input type="text" className="form-control form-control-lg" id="telefone" placeholder='(xx) xxxx-xxxx' name='telefone' value={this.state.telefone} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-2 py-1'>
                                <label htmlFor="senhaProvisoria" className='font-weight-bold mb-0'>Senha provisória</label>
                                <input type="password" className="form-control form-control-lg" id="senhaProvisoria" placeholder='••••••••••' name='senhaProvisoria' value={this.state.senhaProvisoria} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-12 py-1'>
                                <label htmlFor="alergia" className='font-weight-bold mb-0'>Alergia a medicamentos ou remédios</label>
                                <textarea className="form-control form-control-lg" id="alergia" placeholder='Ex: Nenhuma alergia' name='alergia' value={this.state.alergia} onChange={this.onChange}/>
                            </div>
                        </div>
                        <div className='col-12 text-center py-2'>
                            <button className='btn-roxo' onClick={this.onSubmit} >CADASTRAR</button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}