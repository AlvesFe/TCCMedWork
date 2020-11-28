import React, { Component } from 'react';
import getAllEstabelecimentos from '../main/api/getAllEstabelecimentos';
import ListagemEstabelecimento from './template/listagem-estabelecimento'
import Menu from './template/menu'

export default class ListarEstabelecimento extends Component {
    constructor() {
        super()
        this.state = {
            estabelecimentos: [],
            height: window.innerHeight
        }
        window.onresize = () =>{
            this.setState({
                ...this.state, height: window.innerHeight
            })
        }
        getAllEstabelecimentos().then(response => {
            const { Farmacia } = response
            const { Hospital } = response
            const estabelecimentos = []

            Farmacia.forEach(element => {
                estabelecimentos.push({...element, tipo: 'Farmacia'})
            });
            Hospital.forEach(element => {
                estabelecimentos.push({...element, tipo: 'Hospital'})
            });

            this.setState({estabelecimentos: estabelecimentos})
        });

        this.onClick = (value) => {

        }
    }


    render() {
        return (
            <div className='row bg-white'>
                <Menu />
                <div className='container-fluid col-md-8 col-lg-9 pt-4 animate__animated animate__fadeIn animate__fast overflow-auto' style={{ height:this.state.height }}>
                    <h2 className='text-center font-weight-light'>VER TODOS OS ESTABELECIMENTOS</h2>
                    <div className='row justify-content-center py-3'>
                        <div className="col-12 py-3 form-row">

                            {   
                                this.state.estabelecimentos[0] &&
                                this.state.estabelecimentos.map((item, key) => (
                                    (<ListagemEstabelecimento key={key}  tipo={item.tipo} estabelecimento={item}/>)
                                ))
                            }

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}