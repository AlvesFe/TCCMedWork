import React, { Component } from 'react'
import cadastrarMedicamento from '../../main/api/cadastrarMedicamento'
import CadastroErro from '../template/CadastroErro'
import CadastroSucesso from '../template/CadastroSucesso'
import Input from 'react-input-mask'
import Menu from '../template/menu'
import getCompra from '../../main/api/getCompras'
import getAllCompra from '../../main/api/getAllCompras'

export default class HistoricoPedidos extends Component {

    constructor() {
        super()
        this.state = {
            item: []
        }
        getAllCompras().then(res => {
            console.log(res);
            this.setState({
                item: res
            })
        })

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
                                        <th scope="col">REMEDIO</th>
                                        <th scope="col">QUANTIDADE</th>
                                        <th scope="col">PREÇO</th>
                                        <th scope="col">TIPO</th>                   
                                        <th scope="col" className='text-center'>STATUS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.item[0] &&
                                        this.state.item.map((item, key) => {
                                            return (
                                                <tr key={key} className='text-center text-capitalize' >
                                                    <th scope="row">{item.nome}</th>
                                                    <td>{item.quantidade}</td>
                                                    <td>R$ {item.quantidade * item.preco}</td>
                                                    <td>{item.tipo}</td>
                                                    <td>{item.status_pedido}</td>
                                                </tr>
                                            )
                                        })
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

function getAllCompras() {
    return getAllCompra().then(res => {
        return res.Compras
    })
}