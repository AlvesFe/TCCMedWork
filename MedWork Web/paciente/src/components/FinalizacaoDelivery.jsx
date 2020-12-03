import React, { Component } from 'react';
import Menu from './template/menu'


export default class FinalizacaoEntrega extends Component {

    constructor() {
        super()

  
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
                <div className='container col-md-8 col-lg-9 pt-4 animate__animated animate__fadeIn animate__fast pt-5'>
                    <div className='text-center pt-5'>

  
                    <div className={this.state.sucesso} role="alert">
                            <h3 className='font-weight-lighter mb-1'>TUDO CERTO!</h3>
                            <p className='text-uppercase'>Em alguns instantes, nossos entregadores estarão em sua porta!</p>
                            <p className='text-uppercase'>OBS: Não se esqueça de separar o troco! ;)</p>
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