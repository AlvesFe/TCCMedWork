import React, { Component, useState } from 'react';
import axios from 'axios'
// import doLogin from '../api/login'
import Logotipo from '../template/logotipo'
import './Login.css'

const URL = "http://192.168.15.45:3001/admMedWork/login"

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
            const email = this.state.email
            const senha = this.state.senha
            const dados = [email, senha]

            axios.post(`${URL}`, dados)
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
                            ADMINISTRAÇÃO
                    </div>
                        <p className='pt-3'>Faça Login</p>
                        <div className='container'>
                            <div className='py-2'>
                                <input type="text" className='form-control' name="email" id="email" placeholder='Identificação' value={this.state.email} onChange={this.onChange} />
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