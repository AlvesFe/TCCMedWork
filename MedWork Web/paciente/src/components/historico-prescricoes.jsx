import React, { Component } from 'react';
import Menu from './template/menu'
import ListagemHistorico from './template/Listagem-Historico'
import listaReceitas from '../main/api/listReceitas';

export default class HistoricoDePrescricoes extends Component {

    constructor(){
        super()
        const userString = localStorage.getItem('user_data');
        const user = JSON.parse(userString);

        this.state = {
            item: [],
            id_Paciente: user.id_Paciente
        }

        getReceitas(this.state.id_Paciente).then(res => {
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
                                {
                                    this.state.item[0] &&
                                    this.state.item.map((item, key) => (
                                        <ListagemHistorico item={item} key={key} />
                                    ))
                                }
                                
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        )
    }
}

function getReceitas(id_Paciente){
    return listaReceitas(id_Paciente).then(res => {
        return res.data
    })
}