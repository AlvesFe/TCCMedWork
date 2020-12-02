import React, { Component, useState } from 'react';

import Logotipo from '../template/logotipo'
import familia from '../../images/familia.jpg'
import './Login.css'
import doLogin from '../../main/api/login';

class Login extends Component {

    constructor() {
        super()
        this.state = {
            email: "",
            senha: ""
        }
        this.onChange = (e) => {
            const state = Object.assign({}, this.state)
            const campo = e.target.name
            state[campo] = e.target.value
            this.setState(state)
        }
        this.onSubmit = (e) => {
            e.preventDefault()
            doLogin(this.state)
            console.log(this.state)
        }
    }


    render() {
        return (
            <div className="container-fluid overflow-hidden animate__animated animate__fadeIn">
                <div className='row justify-content-center mt-4 mx-4 border border-dark rounded'>
                    <div className='col-5 row justify-content-center bg-white ' >
                        <div className='col-10'>
                            <div className="">
                                <div className='text-center'>
                                    <div>
                                        <Logotipo />
                                    </div>
                                    <h2 className='font-weight-lighter p-0 m-0'>
                                        Seja bem-vindo, paciente!
                                    </h2>
                                    <h4 className='font-weight-lighter'>Faça Login</h4>
                                    <div className='container '>
                                        <div className='py-2'>
                                            <input type="text" className='form-control' name="email" id="email" placeholder='E-mail' value={this.state.email} onChange={this.onChange} />
                                        </div>
                                        <div className='py-2'>
                                            <input type="password" className='form-control' name="senha" id="senha" placeholder="Senha" value={this.state.senha} onChange={this.onChange} />
                                        </div>
                                        <div className=' py-2'>
                                            <button className='btn-roxo' onClick={this.onSubmit}>Entrar</button>
                                        </div>
                                    </div>
                                    <div className=' pt-3'>
                                        <a href="#/esqueci-minha-senha" className='text-dark font-weight-bold'>Esqueci minha senha</a>
                                    </div>
                                    <div className='small py-4'>
                                        <p className='text-dark'> Termos de Uso e Privacidade.</p>
                                        <p className='text-muted'> &copy; MedWork 2020</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col m-0 p-0' >
                    <img src={familia} alt="Wallpaper"  width="100%" height='100%' />
                    </div>
                </div>

            </div>
        )
    }
}

export default Login