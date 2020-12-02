import React, { Component } from 'react'
import cadastrarMedicamento from '../../main/api/cadastrarMedicamento'
import CadastroErro from '../template/CadastroErro'
import CadastroSucesso from '../template/CadastroSucesso'
import Input from 'react-input-mask'
import Menu from '../template/menu'

export default class HistoricoPedidos extends Component {

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

                    <h2 className='text-center pt-4 font-weight-light'>HISTÓRICO DE PEDIDOS</h2>
                    <div>
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <a className="nav-link " href="#/pedidos-pendentes">Entregas pendentes</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#/a-caminho">Retiradas pendentes</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href="#/historico-de-pedidos">Histórico de pedidos</a>
                            </li>
                        </ul>
                    </div>
                    <div className='row animate__animated animate__fadeIn animate__fast'>

                        <div className='container-fluid pt-1'>

                            <table className="table table-hover">
                                <thead className='bg-light'>
                                    <tr className='text-center'>
                                        <th scope="col">CÓD</th>
                                        <th scope="col">NOME</th>
                                        <th scope="col">TARJA</th>
                                        <th scope="col">PREÇO</th>
                                        <th scope="col" className='text-center'>AÇÃO</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className='text-center text-capitalize' >
                                        <th scope="row"></th>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td className='text-center'>

                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}