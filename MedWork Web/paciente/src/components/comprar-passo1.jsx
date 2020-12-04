import React, { Component } from 'react';
import Menu from './template/menu'
import Drogaria from '../images/drogaria-sao-paulo.png'


export default class ComprarPasso1 extends Component {

    constructor() {
        super()
        const itemString = localStorage.getItem('farmacia_compra');
        const item = JSON.parse(itemString);
        this.state = {
            item: item,
            quantidade: 1,
        }

        this.onChange = (e) => {
            e.preventDefault();
            this.setState({
                quantidade: e.target.value
            })
        }
    }

    render() {
        return (
            <div className='row bg-white'>
                <Menu />
                <div className='container col-md-8 col-lg-9 pt-4 animate__animated animate__fadeIn animate__fast'>
                    {/* <h1 className='text-center font-weight-light'>COMPRAR MEDICAMENTO</h1> */}
                    <div className='text-center'>
                        <img height="190px" src={`/api/uploads/farmacia/${this.state.item.foto}`} alt="" className='mb-0' width="300px" />
                        <h2 className='font-weight-lighter my-0'>{this.state.item.nome_farmacia}</h2>
                        <h4 className='font-weight-lighter mt-0'>{this.state.item.endereco}</h4>
                    </div>
                    <div className='pt-5 row justify-content-center'>
                        <div className='col-6'>
                            <p><b>Medicamento: </b>{this.state.item.nome}</p>
                            <p><b>Preço do medicamento: </b>R${this.state.item.preco * this.state.quantidade}</p>
                            {/* <p><b>Taxa de entrega: </b> R$ 15.00</p> */}


                        </div>
                        <div className="col-6">
                            <label htmlFor="quantidade" className='font-weight-bolder'>Quantidade</label>
                            <select className="form-control form-control-sm col-5" id="quantidade" onChange={this.onChange}>
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
                        <a href='#/buscar-medicamento' onClick={() => {
                            localStorage.removeItem('farmacia_compra');
                            window.location.assign('#/buscar-medicamento')
                        }} className='btn btn-danger mr-2'>VOLTAR</a>
                        <button onClick={() => {
                            let data = this.state.item;
                            let quantidade = this.state.quantidade;
                            data = {...data, quantidade}
                            localStorage.setItem('farmacia_compra', JSON.stringify(data))
                            window.location.assign("#/comprar-passo-2")}} className='btn-roxo'>CONTINUAR</button>
                    </div>
                </div>
            </div>
        )
    }


}