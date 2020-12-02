import React, { Component } from 'react'
import cadastrarMedicamento from '../../main/api/cadastrarMedicamento'
import CadastroErro from '../template/CadastroErro'
import CadastroSucesso from '../template/CadastroSucesso'
import Input from 'react-input-mask'
import Menu from '../template/menu'

export default class PedidosPendentes extends Component {

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
            entrega: "text-center text-capitalize",
            saiuEntrega: "",
            concluirEntrega: "d-none"

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
        this.saiu = (e) => {
            e.preventDefault()
            this.setState({
                saiuEntrega: "d-none",
                concluirEntrega: ""
            })
        }
        this.concluir = (e) => {
            e.preventDefault()
            this.setState({
                entrega:"text-center text-capitalize animate__animated animate__fadeOut animate__faster"
            })
        }
        this.voltou = (e) => {
            e.preventDefault()
            this.setState({
                saiuEntrega: "",
                concluirEntrega: "d-none"
            })
        }
    }


    render() {

        return (
            <div>
                <h2 className='text-center pt-4 font-weight-light'>PEDIDOS PENDENTES</h2>
                <div>
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <a className="nav-link active " href="#/pedidos-pendentes">Entregas pendentes</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#/a-caminho">Retiradas pendentes</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#/historico-de-pedidos">Histórico de pedidos</a>
                        </li>
                    </ul>
                </div>
                <div className=' animate__animated animate__fadeIn animate__fast'>

                    <div className="pt-1">

                        <div className='container-fluid pt-1'>

                            <table className="table table-hover">
                                <thead className='bg-light'>
                                    <tr className='text-center'>
                                        <th scope="col">ID</th>
                                        <th scope="col">QTD</th>
                                        <th scope="col">VALOR RECEBIDO</th>
                                        <th scope="col">TROCO</th>
                                        <th scope="col" className='text-center'>AÇÃO</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className={this.state.entrega} >
                                        <th scope="row">1</th>
                                        <td>10</td>
                                        <td>R$55.40</td>
                                        <td>R$4.60</td>
                                        <td className='text-center'>
                                            <div className={this.state.saiuEntrega}>
                                                <button className='btn btn-primary mr-1' onClick={this.saiu}><i className="shipping fast icon"></i></button>
                                            </div>
                                            <div className={this.state.concluirEntrega}>
                                                <button className='btn btn-success mr-1' onClick={this.concluir}><i className="check icon"></i></button>
                                                <button className='btn btn-danger' onClick={this.voltou}><i className="undo alternate icon"></i></button>
                                            </div>
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