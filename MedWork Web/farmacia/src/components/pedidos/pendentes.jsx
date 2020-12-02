import React, { Component } from 'react'
import Listarpedido from '../template/Listarpedido'
import cadastrarMedicamento from '../../main/api/cadastrarMedicamento'
import CadastroErro from '../template/CadastroErro'
import CadastroSucesso from '../template/CadastroSucesso'
import Input from 'react-input-mask'
import Menu from '../template/menu'
import getCompra from '../../main/api/getCompras'

export default class PedidosPendentes extends Component {

    constructor() {
        super()
        this.state = {
            pendentes: [],
            entregando: [],
            entrega: "text-center text-capitalize",
            saiuEntrega: "",
            concluirEntrega: "d-none"
        }

        entregasPedndentes().then(res => {
            this.setState({
                ...this.state,
                pendentes: res
            })
        })

        entregasACaminho().then(res => {
            this.setState({
                ...this.state,
                entregando: res
            })
        })

        this.onChange = (e) => {
            const state = Object.assign({}, this.state)
            const campo = e.target.name
            state[campo] = e.target.value
            this.setState(state)
        }

        this.onSubmit = (e) => {
            e.preventDefault()
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
                                        <th scope="col">NOME</th>
                                        <th scope="col">QTD</th>
                                        <th scope="col">VALOR RECEBIDO</th>
                                        <th scope="col">TROCO</th>
                                        <th scope="col" className='text-center'>AÇÃO</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.pendentes[0] &&
                                        this.state.pendentes.map((item, key) => (
                                            item.tipo === "Entrega" &&
                                            <Listarpedido key={key} item={item} />
                                        ))
                                    }
                                    {
                                        this.state.entregando[0] &&
                                        this.state.entregando.map((item, key) => (
                                            item.tipo === "Entrega" &&
                                            <Listarpedido key={key} item={item} />
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>

                    </div>

                </div>
            </div>
        )
    }

}

function entregasPedndentes(){
    return getCompra("PENDENTE").then(res => {
        return res
    })
}

function entregasACaminho(){
    return getCompra("ENTREGANDO").then(res => {
        return res
    })
}