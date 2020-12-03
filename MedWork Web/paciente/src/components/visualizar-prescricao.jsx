import React, { Component } from 'react'
import Menu from './template/menu'
import Logotipo from '../images/logotipo.png'

export default class VisualizarPrescricao extends Component {
    render() {
        return (
            <div className='row bg-white'>
                <Menu />
                <div className='container col-md-8 col-lg-9 animate__animated animate__fadeIn animate__fast '>
                    <div className='row justify-content-center'>

                        <div className='col-12'>
                            <h1 className='text-center font-weight-light py-4 '>PRESCRIÇÃO</h1>
                        </div>
                        <div className='border border-muted rounded col-8  py-3'>
                            <div className='text-center'>
                                <img src={Logotipo} alt="" width='150px' />
                            </div>
                            <div className='row'>
                                <div className='col-12 text-center py-3'>
                                    <p className='font-weight-bold'>INFORMAÇÕES DO PACIENTE</p>
                                </div>
                                <div className='col-6'>
                                    <p><b>PACIENTE: </b>Nathan Pereira Cavalcante</p>
                                    <p><b>DATA DE NASCIMENTO: </b>2004-05-12</p>
                                </div>
                                <div className='col-6 text-right'>
                                    <p><b>CPF: </b>320.528.500-07</p>
                                    <p><b>ALERGIA: </b>Nenhuma</p>
                                </div>
                                <div className='col-12 py-3'>
                                    <p className='font-weight-bold text-center'>MEDICAMENTO</p>
                                </div>
                                <div className='col-6'>
                                    <p><b>MEDICAMENTO: </b>Diazepan</p>
                                    <p><b>DESCRIÇÃO: </b>Alivio de ansiedade</p>
                                </div>
                                <div className='col-6 text-right'>
                                    <p><b>TARJA: </b>PRETA</p>
                                    <p><b>PREÇO: </b>R$45.04</p>
                                </div>
                                <div className='col-12 py-3'>
                                    <p className='font-weight-bold text-center'>MÉDICO</p>
                                </div>
                                <div className='col-6'>
                                    <p><b>MÉDICO: </b>Lucas</p>
                                    <p><b>CRM: </b> 12457SP</p>
                                </div>
                                <div className='col-6 text-right'>
                                    <p><b>ESPECIALIDADE: </b>Cirurgião</p>
                                    <p><b>DATA DE NASCIMENTO: </b>1980-02-05</p>
                                </div>
                            </div>

                        </div>
                        <div className='col-12 pt-2 text-center'>
                            <button className='btn-roxo'><i className="file alternate outline icon"></i> Acessar bula</button>
                            <button className='btn-roxo mx-2'><i className="download icon"></i> Baixar prescrição</button>
                            <button className='btn-roxo'><i className="search icon"></i> Buscar medicamento</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


}