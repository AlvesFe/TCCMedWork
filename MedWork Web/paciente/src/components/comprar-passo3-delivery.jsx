import React, { Component } from 'react';
import Menu from './template/menu'
import Drogaria from '../images/drogaria-sao-paulo.png'
import cadastrarCompra from '../main/api/cadastrarCompra';
import Event from '../event/Alerts';


export default class ComprarPasso3Delivery extends Component {

    constructor() {
        super()
        const itemString = localStorage.getItem('farmacia_compra');
        const dataUser = localStorage.getItem('user_data');
        const user = JSON.parse(dataUser)
        const item = JSON.parse(itemString);
        this.state = {
            item,
            endereco: "",
            troco: "",
        }

        this.onChange = (e) => {
            const state = Object.assign({}, this.state)
            const campo = e.target.name
            state[campo] = e.target.value
            // this.setState({telefone: cpfMask(e.target.value)})
            this.setState(state)
        }

        this.onClick = (e) => {
            e.preventDefault();
            if(this.state.troco < ((this.state.item.preco * this.state.item.quantidade) + this.state.item.taxa)){
                Event("Valor Invalido")
                return
            }
            const data = {
                quantidade: this.state.item.quantidade,
                valorRecebido: this.state.troco,
                valorDevolvido: (this.state.troco - this.state.item.preco),
                tipo: "Entrega",
                endereco: this.state.endereco,
                fk_id_Farmacia: this.state.item.id_Farmacia,
                fk_id_Paciente: user.id_Paciente,
                fk_id_Remedio: this.state.item.id_Remedio
            }

            cadastrarCompra(data).then(res => {
                if(res){
                    window.location.assign('#/status-delivery')
                }
                else{
                    Event("ErroCompra")
                }
            })
        }
        console.log(this.state.item);
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
                            <p><b>Preço do medicamento: </b>R${this.state.item.preco}</p>
                            <p><b>Taxa de entrega: </b> R${this.state.item.taxa}</p>
                        </div>
                        <div className="col-6">
                            <p className='font-weight-bolder'>Quantidade</p>
                            <p>{this.state.item.quantidade} (qtd)</p>
                        </div>
                        <div className='col-6 pt-4'>
                            <div className="form-group">
                                <label htmlFor="endereco" className='mb-0'>Endereço</label>
                                <input type="text" className="form-control" id="endereco" name="endereco" value={this.state.endereco} onChange={this.onChange} placeholder="Digite seu endereço" />
                            </div>
                        </div>
                        <div className='col-2 pt-4'>
                            <div className="form-group">
                                <label htmlFor="troco" className='mb-0'>Troco</label>
                                <input type="text" className="form-control" value={this.state.troco} onChange={this.onChange} id="troco" name="troco" placeholder="R$__.__" />
                            </div>
                        </div>
                        <div className="col-12 text-center pt-3">
                            <h3>TOTAL: R${(this.state.item.quantidade * this.state.item.preco) + this.state.item.taxa}</h3>
                        </div>
                    </div>
                    <div className='text-center pt-2'>
                        <button onClick={this.onClick} className='btn btn-success mr-2'><i className="shipping fast icon"></i> FINALIZAR</button>
                    </div>
                </div>
            </div >
        )
    }


}