import React, { Component } from 'react';
import Menu from './template/menu'
import FichaSucesso from './template/FichaSucesso'
import FichaErro from './template/FichaErro'

import Logo from '../images/logotipo.png';
export default class StatusFicha extends Component {

    constructor(props) {
        super(props)
        this.state = {
            fichaSucesso: "col-12 animate__animated animate__fadeIn animate__fast animate__delay-1s",
            fichaErro: "d-none"
        }
        // this.CarregarStatus = (e) => {
        //     e.preventDefault();
        //     if (true) {
        //         this.setState({
        //             fichaSucesso: "col-12 animate__animated animate__fadeIn animate__fast",
        //             fichaErro: "d-none"
        //         })
        //     } else {
        //         this.setState({
        //             fichaErro: "col-12 animate__animated animate__fadeIn animate__fast",
        //             fichaSucesso: "d-none"
        //         })
        //     }
        // }
        
        // window.addEventListener('load', this.CarregarStatus)
    }

    render() {
        return (
            <div className='row bg-white'>
                <Menu />
                <div className='container col-md-8 col-lg-9 pt-4 animate__animated animate__fadeIn animate__fast'>
                    <h2 className='text-center font-weight-light'>FINALIZAÇÃO DE ATENDIMENTO</h2>
                    <div className='row justify-content-center py-5'>
                        <div className='col-12 '>
                            <div className={this.state.fichaSucesso}>
                                <FichaSucesso />
                            </div>
                            <div className={this.state.fichaErro}>
                                <FichaErro />
                            </div>
                            <div className='col-12 text-center py-5'>
                                <a href='#/pesquisar-paciente' className='btn-roxo mr-2' onClick={() => { alert('COLOCA O PDF AQUI, BROWWW')}}>IMPRIMIR FICHA</a>
                                <a href='#/pesquisar-paciente' className='btn-roxo'>FINALIZAR ATENDIMENTO</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}