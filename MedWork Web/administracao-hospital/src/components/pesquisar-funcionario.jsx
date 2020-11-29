import React, { Component } from 'react';
import getMedico from '../main/api/getMedico';
import getRecepcionista from '../main/api/getRecepcionista';
import getAllRecepcionista from '../main/api/getAllRecepcionista'
import Menu from './template/menu'
import InputMask from 'react-input-mask'

class PesquisarFuncionario extends Component {

    constructor() {
        super()
        this.state = {
            crm: "",
            cpf: "",
            PesquisaFuncionario: "d-none"
        }
        this.onChange = (e) => {
            const state = Object.assign({}, this.state)
            const campo = e.target.name
            state[campo] = e.target.value
            this.setState(state)
        }
        this.onSubmitMedico = (e) => {
            e.preventDefault()
            this.setState({
                PesquisaFuncionario: ""
            })
            getMedico(this.state).then(res => {
                console.log(res);
            });
        }
        this.onSubmitRecepcionista = (e) => {
            e.preventDefault()
            this.setState({
                PesquisaFuncionario: ""
            })
            getRecepcionista(this.state).then(res => {
                console.log(res);
            })
            // getMedico(this.state);
        }
        this.onSubmitAllRecepcionista = (e) => {
            e.preventDefault()
            getAllRecepcionista().then(res => {
                console.log(res);
            })
            // getMedico(this.state);
        }
        this.onSubmitAllMedicos = (e) => {
            e.preventDefault()
            getAllMedicos().then(res => {
                console.log(res);
            })
            // getMedico(this.state);
        }
    }

    render() {
        return (
            < div className='row bg-white' >
                <Menu />
                <div className='container col-md-8 col-lg-9 pt-4 animate__animated animate__fadeIn animate__fast'>
                    <h2 className='text-center font-weight-light'>PESQUISAR FUNCIONÁRIO</h2>
                    <div className='row justify-content-center py-5'>
                        <div className="col-8 py-5">

                            <div className={this.state.PesquisaFuncionario}>
                                <div className='animate__animated animate__fadeIn'>
                                    <div className="alert alert-danger text-center " role="alert">
                                        FUNCIONÁRIO NÃO ENCONTRADO!
                                </div>
                                </div>
                            </div>

                            <div className="accordion" id="Accordion">
                                <div className="border border-muted">
                                    <a className="collapsed text-dark" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne" name='medico'>
                                        <div className="card-header" id="cabecalho-1">
                                            <h3>
                                                <i className="user md icon"></i>
                                                Médico
                                            </h3>
                                        </div>
                                    </a>
                                    <div id="collapseOne" className="collapse" aria-labelledby="cabecalho-1" data-parent="#Accordion">
                                        <div className="card-body">
                                            <label htmlFor="pesquisarMedico" className='font-weight-bold'>CRM</label>
                                            <InputMask mask="99.999-**" className="form-control form-control-lg" id="pesquisarMedico" name="crm" value={this.state.crm} onChange={this.onChange} placeholder='__.___-__' />
                                            <div className='text-center pt-2'>
                                                <button className='btn-roxo' onClick={this.onSubmitMedico} >PESQUISAR</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="border border-muted">
                                    <a className=" collapsed text-dark" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" name='recepcionista'>
                                        <div className="card-header" id="cabecalho-2">
                                            <h3>
                                                <i className="user icon"></i>
                                                Recepcionista
                                            </h3>
                                        </div>
                                    </a>
                                    <div id="collapseTwo" className="collapse" aria-labelledby="cabecalho-2" data-parent="#Accordion">
                                        <div className="card-body">
                                            <label htmlFor="pesquisarRecepcionista" className='font-weight-bold'>CPF</label>
                                            <InputMask mask="999.999.999-99" className="form-control form-control-lg" id="pesquisarRecepcionista" name="cpf" value={this.state.cpf} onChange={this.onChange} placeholder='___.___.___-__' />
                                            <div className='text-center py-3'>
                                                <button className='btn-roxo' onClick={this.onSubmitRecepcionista} >PESQUISAR</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="border border-muted">
                                    <a className=" collapsed text-dark" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" name='recepcionista'>
                                        <div className="card-header" id="cabecalho-3">
                                            <h3>
                                                <i className="search icon"></i>
                                                Busca generalizada (todos)
                                            </h3>
                                        </div>
                                    </a>
                                    <div id="collapseThree" className="collapse" aria-labelledby="cabecalho-3" data-parent="#Accordion">
                                        <div className="card-body text-center">
                                            <div className='clearfix'>
                                                <a href="#/todos-os-medicos" className='btn-roxo float-left'>
                                                        <i className="user md icon"></i> MÉDICOS
                                                </a>
                                                <a href="#/todos-os-recepcionistas" className='btn-roxo'>
                                                        <i className="user icon"></i> RECEPCIONISTAS
                                                </a>
                                                <a href="#/todos-os-funcionarios" className='btn-roxo float-right'>
                                                        <i className="users icon"></i> FUNCIONÁRIOS
                                                </a>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default PesquisarFuncionario