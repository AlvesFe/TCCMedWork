import React, { Component } from 'react';
import Menu from './template/menu'
import Drogaria from '../images/drogaria-sao-paulo.png'


export default class ComprarPasso3Delivery extends Component {
    render() {
        return (
            <div className='row bg-white'>
                <Menu />
                <div className='container col-md-8 col-lg-9 pt-4 animate__animated animate__fadeIn animate__fast'>
                    {/* <h1 className='text-center font-weight-light'>COMPRAR MEDICAMENTO</h1> */}
                    <div className='text-center'>
                        <img src={Drogaria} alt="" className='mb-0' width="300px" />
                        <h2 className='font-weight-lighter my-0'>DROGARIA SÃO PAULO</h2>
                        <h4 className='font-weight-lighter mt-0'>Rua dos quimbá, 2222, Ipiranga, São Paulo, SP</h4>
                    </div>
                    <div className='pt-5 row justify-content-center'>
                        <div className='col-6'>
                            <p><b>Medicamento: </b>nomeDoMedicamento</p>
                            <p><b>Preço do medicamento: </b>R$13.40</p>
                            <p><b>Taxa de entrega: </b> R$ 15.00</p>
                        </div>
                        <div className="col-6">
                            <p className='font-weight-bolder'>Quantidade</p>
                            <p>1 (qtd)</p>
                        </div>
                        <div className='col-6 pt-4'>
                            <div className="form-group">
                                <label htmlFor="endereco" className='mb-0'>Endereço</label>
                                <input type="text" className="form-control" id="endereco" placeholder="Digite seu endereço" />
                            </div>
                        </div>
                        <div className='col-2 pt-4'>
                            <div className="form-group">
                                <label htmlFor="troco" className='mb-0'>Troco</label>
                                <input type="text" className="form-control" id="troco" placeholder="R$__.__" />
                            </div>
                        </div>
                        <div className="col-12 text-center pt-3">
                            <h3>TOTAL: R$28.40</h3>
                        </div>
                    </div>
                    <div className='text-center pt-2'>
                        <a href='#/buscar-medicamento' className='btn btn-success mr-2'><i className="shipping fast icon"></i> FINALIZAR</a>
                    </div>
                </div>
            </div >
        )
    }


}