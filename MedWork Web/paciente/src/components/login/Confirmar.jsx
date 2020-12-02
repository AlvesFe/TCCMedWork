import React, { Component } from 'react';

import Logotipo from '../template/logotipo'
import familia from '../../images/familia.jpg'
import './Login.css'

class Confirmar extends Component {


    constructor() {
        super()
        this.state = {
            token: "",

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
            <div className="container-fluid overflow-hidden animate__animated animate__fadeIn">
                <div className='row justify-content-center mt-4 mx-4 border border-dark rounded'>
                    <div className='col-5 row justify-content-center bg-white py-3' >
                        <div className='col-10'>
                            <div className="">
                                <div className='text-center'>
                                    <div>
                                        <Logotipo />
                                    </div>
                                    <h2 className='font-weight-lighter p-0 m-0'>
                                        Código de verificação
                                    </h2>
                                    <h4 className='font-weight-lighter text-justify'>Para redefinir a senha, insira o Token (código) que foi enviado no seu e-mail.</h4>
                                    <div className='container '>
                                        <div className='py-2'>
                                            <input type="text" className='form-control' name="token" id="token" placeholder='Token' value={this.state.token} onChange={this.onChange} />
                                        </div>
                                        <div className=' py-2'>
                                            <button className='btn-roxo' onClick={this.onSubmit}>Enviar</button>
                                        </div>
                                    </div>
                                    <div className=' pt-3'>
                                        Lembrou-se de sua senha? <a href="#/login" className='text-dark font-weight-bold'>Faça Login!</a>
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
                        <img src={familia} alt="Wallpaper" width="100%" height='100%' />
                    </div>
                </div>

            </div>
        )
    }
}

export default Confirmar