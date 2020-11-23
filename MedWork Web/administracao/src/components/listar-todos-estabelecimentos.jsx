import React, { Component } from 'react';
import ListagemEstabelecimento from './template/listagem-estabelecimento'
import Menu from './template/menu'

export default class ListarEstabelecimento extends Component {
    constructor() {
        super()
        this.state = {
            image: {},
            nomeEmpresa: "teste",
            tipoEstabelecimento: "",
            cnpj: "",
            endereco: "",
        }
    }


    render() {
        return (
            <div className='row bg-white'>
                <Menu />
                <div className='container-fluid col-md-8 col-lg-9 pt-4 animate__animated animate__fadeIn animate__fast'>
                    <h2 className='text-center font-weight-light'>VER TODOS OS ESTABELECIMENTOS</h2>
                    <div className='row justify-content-center py-3'>
                        <div className="col-12 py-3 form-row">

                            <ListagemEstabelecimento/>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}