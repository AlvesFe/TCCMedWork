import React, { Component } from 'react';
import Menu from './template/menu'
import ListagemFarmacias from './template/Listagem-Farmacias'
import Drogaria from '../images/drogaria-sao-paulo.png'


export default class BuscarMedicamento extends Component {
    render() {
        return (
            <div className='row bg-white'>
                <Menu />
                <div className='container col-md-8 col-lg-9 pt-4 animate__animated animate__fadeIn animate__fast'>
                    <h1 className='text-center font-weight-light'>BUSCAR MEDICAMENTO</h1>
                    <div className='container'>
                        <div className="row">
                            <ListagemFarmacias />
                        </div>
                    </div>

                </div>
            </div>
        )
    }


}