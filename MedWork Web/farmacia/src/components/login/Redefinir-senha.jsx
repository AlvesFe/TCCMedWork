import React, { Component } from 'react';

import Logotipo from '../template/logotipo'
import './Login.css'

class ValidacaoCodigo extends Component {


    constructor() {
        super()
        this.state = {
            senha: "",
            confSenha: "",
            senhaVazia: "d-none",
            senhaErro: "d-none",
            senhaSucesso: "d-none"
        }
        this.onChange = (e) => {
            const state = Object.assign({}, this.state)
            const campo = e.target.name
            state[campo] = e.target.value
            this.setState(state)
        }
        this.onSubmit = (e) => {
            e.preventDefault()
            var mostrar = ""

            var resultado

            if (this.state.senha === this.state.confSenha) {
                resultado = 'sucesso'
            }
            if (this.state.senha != this.state.confSenha) {
                resultado = 'erro'
            }
            if (this.state.senha === "") {
                resultado = 'vazia'
            }

            switch (resultado) {
                case 'sucesso':
                    this.setState({
                        senhaSucesso: e.mostrar,
                        senhaErro: "d-none",
                        senhaVazia: "d-none"
                    })
                    console.log('tudo certo')
                    break
                case 'erro':
                    this.setState({
                        senhaErro: e.mostrar,
                        senhaSucesso: "d-none",
                        senhaVazia: "d-none"
                    })
                    console.log('deu ruim')
                    break;
                case 'vazia':
                    this.setState({
                        senhaVazia: e.mostrar,
                        senhaSucesso: "d-none",
                        senhaErro: "d-none"
                    })
                    console.log('Senhas vazias');
                    break;
                default:
                    console.log('wtf');
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
                        <div className='container pt-3'>
                            <div className={this.state.senhaVazia}>
                                <div className="alert alert-warning" role="alert">
                                    Nenhum campo pode estar vazio!
                                </div>
                            </div>
                            <div className={this.state.senhaErro}>
                                <div className="alert alert-danger" role="alert">
                                    As senhas devem ser iguais!
                                </div>
                            </div>
                            <div className={this.state.senhaSucesso}>
                                <div className="alert alert-success" role="alert">
                                    Senha alterada com sucesso!
                                </div>
                            </div>
                            <div className='py-2'>
                                <input type="password" className='form-control' name="senha" id="senha" placeholder='Nova senha' value={this.state.senha} onChange={this.onChange} />
                            </div>
                            <div className='py-2'>
                                <input type="password" className='form-control' name="confSenha" id="confSenha" placeholder='Repita a nova senha' value={this.state.confSenha} onChange={this.onChange} />
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

export default ValidacaoCodigo