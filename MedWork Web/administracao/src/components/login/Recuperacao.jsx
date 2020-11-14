import React, { Component } from 'react';

import Logotipo from '../template/logotipo'
import './Login.css'

class Recuperacao extends Component {


        constructor() {
        super()
        this.state = {
            email: ""
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
                            ADMINISTRAÇÃO
                    </div>
                        <p className='text-center pt-3'>Insira seu e-mail para que possamos <br /> enviar um link de redifinição de senha</p>
                        <div className='container'>
                            <div className='py-2'>
                                <input type="text" className='form-control' name="email" id="email" placeholder='E-mail' value={this.state.email} onChange={this.onChange} />
                            </div>

                            <div className=' py-2'>
                                <button className='btn-roxo' onClick={this.onSubmit}>Enviar</button>
                            </div>
                        </div>
                        <div className=' pt-3'>
                            <p>Relembrou sua senha? <a href="#login" className='text-dark'>Faça login!</a></p>
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

export default Recuperacao