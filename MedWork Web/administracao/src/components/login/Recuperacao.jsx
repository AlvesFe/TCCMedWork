import React, { Component } from 'react';
import recuperarSenha from '../../main/api/recuperarSenha';
import ValidacaoCodigo from '../login/Confirmar'
import {withRouter} from 'react-router-dom'
import Logotipo from '../template/logotipo'
import './Login.css'
import Event from '../../event/Alerts';

class Recuperacao extends Component {


        constructor(props) {
        super(props)
        this.state = {
            email: "",
            EmailNaoCadastrado: "d-none"
        }
        this.onChange = (e) => {
            const state = Object.assign({}, this.state)
            const campo = e.target.name
            state[campo] = e.target.value
            this.setState(state)
        }
        this.onSubmit = (e) => {
            var emailCadastrado = 'leonardo_lemos@outlook.com.br'
            var mostrar = ''
            e.preventDefault()
            recuperarSenha(this.state).then(res => {
                if(res === "Verifique a Caixa de Email"){
                    this.setState({
                        EmailNaoCadastrado: "d-none"
                    })
                    Event("Verifique Email");
                }
                else{
                    Event("Email Não Encontrado");
                    this.setState({
                        EmailNaoCadastrado: e.mostrar
                    })
                }
            });
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
                        <div className={this.state.EmailNaoCadastrado}>
                                <div className="alert alert-danger" role="alert">
                                    E-mail não cadastrado em nossa base de dados!
                                </div>
                            </div>
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