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
                <div className='container col-md-8 col-lg-9'>
                    <PedidosPendentes />
                </div>
            </div >
        )
    }
}

export default Inicio