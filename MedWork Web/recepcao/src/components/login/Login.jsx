import React, { Component, useState } from 'react';

import Logotipo from '../template/logotipo'
import './Login.css'


class Login extends Component {

    constructor() {
        super()
        this.state = {
            identificacao: "",
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
            console.log(this.state)
        }
    }


    render() {
        return (
            <div className='col-12' >
                <div className="row justify-content-center mt-5">
                    <div className=' border border-muted rounded shadow px-3 bg-white text-center' style={{ minWidth: '400px', maxWidth: '500px' }}>
                        <div>
                            <Logotipo />
                        </div>
                        <div className='bg-danger font-weight-bolder text-white px-5 py-1'>
                            RECEPÇÃO
                    </div>
                        <p className='pt-3'>Faça Login</p>
                        <div className='container'>
                            <div className='py-2'>
                                <input type="text" className='form-control' name="identificacao" id="identificacao" placeholder='Identificação' value={this.state.identificacao} onChange={this.onChange} />
                            </div>
                            <div className='py-2'>
                                <input type="password" className='form-control' name="senha" id="senha" placeholder="Senha" value={this.state.senha} onChange={this.onChange} />
                            </div>
                            <div className=' py-2'>
                                <button className='btn-roxo' onClick={this.onSubmit}>Entrar</button>
                            </div>
                        </div>
                        <div className=' pt-3'>
                            <a href="#esqueci-minha-senha" className='text-dark'>Esqueci minha senha</a>
                        </div>
                        <div className=' small pt-4'>
                            <p className='text-dark mb-0'> Termos de Uso e Privacidade.</p>
                            <p className='text-muted'> &copy; MedWork 2020</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login