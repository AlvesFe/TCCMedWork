import React, { Component } from 'react'
import Menu from './template/menu'
import Logotipo from '../images/logotipo.png'
import PedidosPendentes from './pedidos/pendentes'
import PedidosConfirmados from './pedidos/confirmados'
import PedidosHistorico from './pedidos/historico'
import HistoricoPedidos from './pedidos/historico'
import getCompra from '../main/api/getCompras'
import getAllcompra from '../main/api/getAllCompras'

class Inicio extends Component {
    constructor() {
        super()
        this.state = {
            pendentes: "nav-link active",
            confirmados: "nav-link",
            historico: "nav-link",
            contentPendentes: "container-fluid",
            contentConfirmados: "d-none",
            contentHistorico: "d-none"
        }

        this.abaPendentes = (e) => {
            e.preventDefault()
            getCompra("PENDENTE").then(res => {
                console.log(res);
            })
            this.setState({
                pendentes: "nav-link active",
                confirmados: "nav-link",
                historico: "nav-link",
                contentPendentes: "container-fluid",
                contentConfirmados: "d-none",
                contentHistorico: "d-none"
            })

        }
        this.abaConfirmados = (e) => {
            e.preventDefault()
            getCompra("CONCLUIDO").then(res => {
                console.log(res);
            })
            this.setState({
                pendentes: "nav-link",
                confirmados: "nav-link active",
                historico: "nav-link",
                contentPendentes: "d-none",
                contentConfirmados: "container-fluid",
                contentHistorico: "d-none"
            })
        }
        this.abaHistorico = (e) => {
            e.preventDefault()
            getAllcompra().then(res => {
                console.log(res);
            })
            this.setState({
                pendentes: "nav-link",
                confirmados: "nav-link",
                historico: "nav-link active",
                contentPendentes: "d-none",
                contentConfirmados: "d-none",
                contentHistorico: "container-fluid"

            })
        }
    }


    render() {
        return (
            < div className='row bg-white' >
                <Menu />
                <div className='container col-md-8 col-lg-9 animate__animated animate__fadeIn animate__fast'>
                    <h2 className='text-center pt-4 font-weight-light'>PEDIDOS</h2>
                    <div>
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <a className={this.state.pendentes} href="#" name='pendentes' onClick={this.abaPendentes}>Pendentes</a>
                            </li>
                            <li className="nav-item">
                                <a className={this.state.confirmados} href="#" name='confirmados' onClick={this.abaConfirmados}>Confirmados</a>
                            </li>
                            <li className="nav-item">
                                <a className={this.state.historico} href="#" name='historico' onClick={this.abaHistorico}>Hisórico de pedidos</a>
                            </li>
                        </ul>
                    </div>

                    <div className={this.state.contentPendentes}>
                        <PedidosPendentes />
                    </div>
                    <div className={this.state.contentConfirmados}> 
                        <PedidosConfirmados />
                    </div>
                    <div className={this.state.contentHistorico} >
                        <HistoricoPedidos />
                    </div>



                </div>
            </div >
        )
    }
}

export default Inicio