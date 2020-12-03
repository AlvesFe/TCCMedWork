import React, { Component } from 'react';
import Menu from './template/menu'
import Drogaria from '../images/drogaria-sao-paulo.png'


export default class ComprarPasso1 extends Component {
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
                            {/* <p><b>Taxa de entrega: </b> R$ 15.00</p> */}


                        </div>
                        <div className="col-6">
                            <label htmlFor="quantidade" className='font-weight-bolder'>Quantidade</label>
                            <select className="form-control form-control-sm col-5" id="quantidade">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                        <div className="col-12 text-center pt-3">
                            {/* <h3>TOTAL: R$28.40</h3> */}

                        </div>
                    </div>
                    <div className="py-5"></div>
                    <div className='text-center pt-5'>
                        <a href='#/buscar-medicamento' className='btn btn-danger mr-2'>VOLTAR</a>
                        <button className='btn-roxo'>CONTINUAR</button>
                    </div>
                </div>
            </div>
        )
    }


}