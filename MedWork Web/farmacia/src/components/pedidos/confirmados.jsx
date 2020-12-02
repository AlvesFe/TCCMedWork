import React, { Component } from 'react'
import cadastrarMedicamento from '../../main/api/cadastrarMedicamento'
import CadastroErro from '../template/CadastroErro'
import CadastroSucesso from '../template/CadastroSucesso'
import Input from 'react-input-mask'
import Menu from '../template/menu'

export default class PedidosConfirmados extends Component {

    constructor() {
        super()
        this.state = {
            codigoMedicamento: "",
            nomeMedicamento: "",
            tarjaMedicamento: "",
            codigoMedicamento: "",
            fabricanteMedicamento: "",
            validadeMedicamento: "",
            quantidadeMedicamento: "",
            precoMedicamento: "",
            descricaoMedicamento: "",
            cadastrarSucesso: "d-none",
            cadastrarErro: "d-none",
        }

        this.onChange = (e) => {
            const state = Object.assign({}, this.state)
            const campo = e.target.name
            state[campo] = e.target.value
            this.setState(state)
        }

        this.onSubmit = (e) => {
            e.preventDefault()
            cadastrarMedicamento(this.state).then(res => {
                if (res) {
                    this.setState({
                        cadastrarSucesso: "col-12 animate__animated animate__fadeIn animate__fast",
                        cadastrarErro: "d-none",
                        codigoMedicamento: "",
                        nomeMedicamento: "",
                        tarjaMedicamento: "",
                        codigoMedicamento: "",
                        fabricanteMedicamento: "",
                        validadeMedicamento: "",
                        quantidadeMedicamento: "",
                        precoMedicamento: "",
                        descricaoMedicamento: ""
                    })
                } else {
                    this.setState({
                        cadastrarErro: "col-12 animate__animated animate__fadeIn animate__fast",
                        cadastrarSucesso: "d-none"
                    })
                }
            })

        }

    }


    render() {

        return (
            < div className='row bg-white' >
                <Menu />
                <div className='container col-md-8 col-lg-9'>
                    <h2 className='text-center pt-4 font-weight-light'>PEDIDOS PENDENTES</h2>
                    <div>
                    <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <a className="nav-link " href="#/pedidos-pendentes">Entregas pendentes</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href="#/a-caminho">Retiradas pendentes</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#/historico-de-pedidos">Histórico de pedidos</a>
                            </li>
                        </ul>
                    </div>
                
                    <div className='row pt-3  animate__animated animate__fadeIn animate__fast'>

                        <div className="col-12">
                            <div className={this.state.cadastrarSucesso}>
                                <CadastroSucesso />
                            </div>
                            <div className={this.state.cadastrarErro}>
                                <CadastroErro />
                            </div>
            confirmados
                        </div>

                    </div>
                </div>
            </div>
        )
    }

}