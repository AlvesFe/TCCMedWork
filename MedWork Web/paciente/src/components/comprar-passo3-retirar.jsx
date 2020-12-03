import React, { Component } from 'react';
import Menu from './template/menu'
import Drogaria from '../images/drogaria-sao-paulo.png'
import cadastrarCompra from '../main/api/cadastrarCompra';


export default class ComprarPasso3Retirar extends Component {

    constructor() {
        super()
        const itemString = localStorage.getItem('farmacia_compra');
        const dataUser = localStorage.getItem('user_data');
        const user = JSON.parse(dataUser)
        const item = JSON.parse(itemString);
        this.state = {
            item
        }

        this.onClick = (e) => {
            e.preventDefault();
            const data = {
                quantidade: this.state.item.quantidade,
                valorRecebido: this.state.item.preco,
                valorDevolvido: 0.00,
                tipo: "Retirar",
                endereco: this.state.item.endereco,
                fk_id_Farmacia: this.state.item.id_Farmacia,
                fk_id_Paciente: user.id_Paciente,
                fk_id_Remedio: this.state.item.id_Remedio
            }
            cadastrarCompra(data)
        }
    }

    render() {
        return (
            <div className='row bg-white'>
                <Menu />
                <div className='container col-md-8 col-lg-9 pt-4 animate__animated animate__fadeIn animate__fast'>
                    {/* <h1 className='text-center font-weight-light'>COMPRAR MEDICAMENTO</h1> */}
                    <div className='text-center'>
                        <img height="200px" src={`/api/uploads/farmacia/${this.state.item.foto}`} alt="" className='mb-0' width="300px" />
                        <h2 className='font-weight-lighter my-0'>{this.state.item.nome_farmacia}</h2>
                        <h4 className='font-weight-lighter mt-0'>{this.state.item.endereco}</h4>
                    </div>
                    <div className='pt-5 row justify-content-center'>
                        <div className='col-6'>
                            <p><b>Medicamento: </b>{this.state.item.nome}</p>
                            <p><b>Preço do medicamento: </b>R${this.state.item.preco * this.state.item.quantidade}</p>
                            {/* <p><b>Taxa de entrega: </b> R$ 15.00</p> */}


                        </div>
                        <div className="col-6">
                            <p className='font-weight-bolder'>Quantidade</p>
                            <p>{this.state.item.quantidade} (qtd)</p>
                        </div>
                        <div className="col-12 text-center pt-3">
                            {/* <h3>TOTAL: R$28.40</h3> */}

                        </div>
                    </div>
                    <div className="py-5"></div>
                    <div className='text-center pt-5'>
                        <button onClick={this.onClick} className='btn btn-success'><i className="shopping bag icon"></i>RETIRAR</button>
                    </div>
                </div>
            </div>
        )
    }


}