import React, { Component } from 'react'
import cadastrarMedicamento from '../../main/api/cadastrarMedicamento'
import CadastroErro from '../template/CadastroErro'
import CadastroSucesso from '../template/CadastroSucesso'
import Input from 'react-input-mask'
import Menu from '../template/menu'
import Listarpedido from '../template/Listarpedido'
import getCompra from '../../main/api/getCompras'

export default class PedidosConfirmados extends Component {

    constructor() {
        super()
        this.state = {
            item: [],
            cadastrarSucesso: "d-none",
            cadastrarErro: "d-none",
        }

        GetRetirada().then(res => {
            this.setState({
                item: res
            })

        })
        this.onSubmit = (e) => {
            e.preventDefault()


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
                                        this.state.item[0] &&
                                        this.state.item.map((item, key) => (
                                            item.tipo === "Retirar" &&
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

function GetRetirada() {
    return getCompra("PENDENTE").then(res => {
        return res
    })

}