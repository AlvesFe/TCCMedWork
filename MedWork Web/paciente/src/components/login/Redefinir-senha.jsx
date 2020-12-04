import React, { Component } from 'react';
import alterarSenha from '../../main/api/alterarSenha'
import Logotipo from '../template/logotipo'
import familia from '../../images/familia.jpg'
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
            var mostrar
            alterarSenha(this.state).then(res => {
            })
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
                    break
                case 'erro':
                    this.setState({
                        senhaErro: e.mostrar,
                        senhaSucesso: "d-none",
                        senhaVazia: "d-none"
                    })
                    break;
                case 'vazia':
                    this.setState({
                        senhaVazia: e.mostrar,
                        senhaSucesso: "d-none",
                        senhaErro: "d-none"
                    })
                    break;
                default:
            }

        }
    }


    render() {
        return (
            <div>
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
                                            Redefinir senha
                                        </h2>
                                        <p className='text-center pt-2'>
                                            Agora você pode criar uma nova senha.
                                        </p>
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
            </div>
        )
    }
}

export default ValidacaoCodigo