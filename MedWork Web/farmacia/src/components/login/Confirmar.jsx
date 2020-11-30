import React, { Component } from 'react';
import Logotipo from '../template/logotipo'
import './Login.css'
import Event from '../../event/Alerts';

class Confirmar extends Component {


    constructor() {
        super()
        this.state = {
            token: "",
            TokenErro: "d-none"
        }
        this.onChange = (e) => {
            const state = Object.assign({}, this.state)
            const campo = e.target.name
            state[campo] = e.target.value
            this.setState(state)
        }

        this.onSubmit = (e) => {
            var mostrar = ''
            e.preventDefault()
                if (true) {
                    Event("Altere Sua Senha")
                }
                else {
                    Event("Codigo Invalido")
                }


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
                            FARMÁCIA
                    </div>
                        <p className='text-center pt-3'>Insira o código que foi enviado em seu email.</p>
                        <div className='container'>
                            <div className={this.state.TokenErro}>
                                <div className="alert alert-danger" role="alert">
                                    O código está incorreto!
                                </div>
                            </div>
                            <div className='py-2'>
                                <input type="text" className='form-control' name="token" id="token" placeholder='Código' value={this.state.token} onChange={this.onChange} />
                            </div>

                            <div className=' py-2'>
                                <button className='btn-roxo' onClick={this.onSubmit}>Enviar</button>
                            </div>
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

export default Confirmar