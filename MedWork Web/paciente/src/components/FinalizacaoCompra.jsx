import React, { Component } from 'react';
import Menu from './template/menu'

export default class FinalizacaoCompra extends Component {

    constructor() {
        super()
        setTimeout(() => {window.location.assign('#/inicio')}, 6000)
        this.state = {
            carregando: "",
            sucesso: "d-none",
            erro: "d-none"
        }

        setTimeout(() => {
            if (true) {
                this.setState({
                    carregando: "d-none",
                    sucesso: "alert alert-success py-5 mt-5 animate__animated animate__fadeIn",
                    erro: "d-none"
            })
        } else {
            this.setState({
                carregando: "d-none",
                sucesso: "d-none",
                erro: "alert alert-danger py-5 mt-5 animate__animated animate__fadeIn"
            })
        }
        }, 2500);



    }

    render() {
        return (
            <div className='row bg-white'>
                <Menu />
                <div className='container col-md-8 col-lg-9 pt-4 animate__animated animate__fadeIn animate__fast py-5'>
                    <div className='text-center py-5 container'>


                        <div className={this.state.sucesso} role="alert">
                            <h3 className='font-weight-lighter mb-1'>TUDO CERTO!</h3>
                            <p>Em 30 minutos seu pedido estará pronto para ser retirado!</p>
                        </div>

                        <div className={this.state.erro} role="alert">
                            <h3 className='font-weight-lighter mb-1'>HOUVE UM ERRO!</h3>
                            <p>Não foi possível processar o seu pedido.</p>
                        </div>

                        <div className={this.state.carregando}>
                            <div className="ui active inverted dimmer">
                                <div className="ui text loader">Finalizando</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div >
        )
    }


}