import React, { Component } from 'react';
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
            observacoes: ""
        }
        this.onChange = (e) => {
            const state = Object.assign({}, this.state)
            const campo = e.target.name
            state[campo] = e.target.value
            this.setState(state)
        }
        this.onSubmit = (e) => {
            e.preventDefault()
        }
    }

    render() {

        return (
            <div className='row bg-white'>
                <Menu />
                <div className='container col-md-8 col-lg-9 pt-4 animate__animated animate__fadeIn animate__fast'>
                    <h2 className='text-center font-weight-light'>ENCAMINHAMENTO</h2>

                    <div className='row justify-content-center py-3'>
                        <div className="col-12 py-5 form-row">
                            <div className='form-group col-5 py-1'>
                                <label htmlFor="nomePaciente" className='font-weight-bold mb-0'>Nome</label>
                                <input type="text" className="form-control form-control-lg" id="nomePaciente" name="nomePaciente" value={this.state.nomePaciente} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-3 py-1'>
                                <label htmlFor="dataNascimento" className='font-weight-bold mb-0'>Data de nascimento</label>
                                <input type="text" className="form-control form-control-lg" id="dataNascimento" name='dataNascimento' value={this.state.dataNascimento} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-2 py-1'>
                                <label htmlFor="tipoSanguineo" className='font-weight-bold mb-0'>Tipo sanguíneo</label>
                                <input type="text" className="form-control form-control-lg" id="tipoSanguineo" name='tipoSanguineo' value={this.state.tipoSanguineo} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-2 py-1'>
                                <label htmlFor="status" className='font-weight-bold mb-0'>Status</label>
                                <select className="form-control form-control-lg" id="status" value={this.state.status} onChange={this.onChange}>
                                    <option value="">Escolha</option>
                                    <option value="normal">Normal</option>
                                    <option value="preferencial">Preferencial</option>
                                    <option value="urgente">Urgente</option>
                                </select>
                            </div>

                            <div className='form-group col-12 py-1'>
                                <label htmlFor="observacoes" className='font-weight-bold mb-0'>Observações</label>
                                <textarea className="form-control form-control-lg" id="observacoes" name='observacoes' value={this.state.observacoes} onChange={this.onChange}/>
                            </div>
                        </div>
                        <div className='col-12 text-center py-2'>
                            <a href='#/pesquisa' className='btn btn-danger mr-1'> VOLTAR</a>
                            <button className='btn-roxo mr-1' onClick={this.onSubmit} >ENCAMINHAR PARA SALA DE ESPERA</button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}