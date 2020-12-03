import React, { Component } from 'react';
import Menu from './template/menu'
import ListagemHistorico from './template/Listagem-Historico'

export default class HistoricoDePrescricoes extends Component {
    render() {
        return (
            <div className='row bg-white'>
                <Menu />
                <div className='container col-md-8 col-lg-9 pt-4 animate__animated animate__fadeIn animate__fast'>
                    <h1 className='text-center font-weight-light'>HISTÓRICO DE PRESCRIÇÕES</h1>
                    <div className='container'>
                        <table className="table table-hover">
                            <thead className='bg-light'>
                                <tr className='text-center'>
                                    <th scope="col">MEDICAMENTO</th>
                                    <th scope="col">DATA EMISSÃO</th>
                                    <th scope="col">DATA VALIDADE</th>
                                    <th scope="col">DOSAGEM</th>
                                    <th scope="col" className='text-center'>AÇÃO</th>
                                </tr>
                            </thead>
                            <tbody>
                                <ListagemHistorico />
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        )
    }


}