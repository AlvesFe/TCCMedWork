import React, { Component } from 'react';
import InputMask from 'react-input-mask';

import Menu from './template/menu'

export default class Encaminhamento extends Component {

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
            sintomas: ""
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
                    <h2 className='text-center font-weight-light'>ENCAMINHAMENTO</h2>

                    <div className='row justify-content-center py-3'>
                        <div className="col-10 py-5 form-row">
                            <div className='form-group col-6 py-1'>
                                <label htmlFor="nomePaciente" className='font-weight-bold mb-0'>Nome</label>
                                <input type="text" className="form-control form-control-sm" id="nomePaciente" name="nomePaciente" value={this.state.nomePaciente} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-3 py-1'>
                                <label htmlFor="cpf" className='font-weight-bold mb-0'>CPF</label>
                                <InputMask mask="999.999.999-99" className="form-control form-control-sm" id="cpf" placeholder='___.___.___-__' name='cpf' value={this.state.cpf} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-3 py-1'>
                                <label htmlFor="status" className='font-weight-bold mb-0'>Status</label>
                                <select className="form-control form-control-sm" id="status" value={this.state.status} onChange={this.onChange}>
                                    <option value="">Escolha</option>
                                    <option value="normal">Normal</option>
                                    <option value="preferencial">Preferencial</option>
                                    <option value="urgente">Urgente</option>
                                </select>
                            </div>

                            <div className='form-group col-12 py-1'>
                                <label htmlFor="sintomas" className='font-weight-bold mb-0'>Sintomas</label>
                                <textarea className="form-control form-control-sm" placeholder='Digite os sintomas iniciais do paciente' id="sintomas" name='sintomas' value={this.state.sintomas} onChange={this.onChange}/>
                            </div>
                        </div>
                        <div className='col-12 text-center py-2'>
                            <a href='#/ver-paciente' className='btn btn-danger mr-1'> VOLTAR</a>
                            <button className='btn-roxo mr-1' onClick={this.onSubmit} >IMPRIMIR FICHA</button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}