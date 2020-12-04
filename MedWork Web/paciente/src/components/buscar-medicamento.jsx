import React, { Component } from 'react';
import Menu from './template/menu'
import ListagemFarmacias from './template/Listagem-Farmacias'
import Drogaria from '../images/drogaria-sao-paulo.png'
import getFarmaciaRemedio from '../main/api/getFarmaciaRemedio';


export default class BuscarMedicamento extends Component {

    constructor() {
        super()
        this.state = {
            item: []
        }

        getFarmacias().then(res => {
            this.setState({
                item: res
            })

        })
    }

    render() {
        return (
            <div className='row bg-white'>
                <Menu />
                <div className='container col-md-8 col-lg-9 pt-4 animate__animated animate__fadeIn animate__fast'>
                    <h1 className='text-center font-weight-light'>BUSCAR MEDICAMENTO</h1>
                    <div className='container'>
                        <div className="row">
                            {
                                this.state.item[0] &&
                                this.state.item.map((item, key) => (
                                    <ListagemFarmacias key={key} item={item} />
                                ))
                            }
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

function getFarmacias() {
    const id = localStorage.getItem('remedio');
    return getFarmaciaRemedio(id).then(res => {
        return res.data
    })
}