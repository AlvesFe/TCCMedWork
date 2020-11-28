import React, { Component } from 'react';
import ListagemEstabelecimento from './template/listagem-estabelecimento'
import cadastrarFarmacia from '../main/api/cadastrarFarmacia';
import Menu from './template/menu'
import getFarmacias from '../main/api/getFarmacias';

export default class ListarEstabelecimento extends Component {
    constructor(props) {
        super(props)
        this.state = {
            drogarias:[],
            height: window.innerHeight
        }
        window.onresize = () =>{
            this.setState({
                ...this.state, height: window.innerHeight
            })
        }
        getFarmacias().then(response => {
            this.setState({drogarias: response});
        })
    }

    render() {
        return (
            <div className='row bg-white'>
                <Menu />
                <div className='container-fluid col-md-8 col-lg-9 pt-4 animate__animated animate__fadeIn animate__fast overflow-auto' style={{ height:this.state.height }}>
                    <h2 className='text-center font-weight-light'>VER TODAS AS DROGARIAS</h2>
                    <div className='row justify-content-center py-3'>
                        <div className="col-12 py-3 form-row">

                            {   
                                this.state.drogarias[0] &&
                                this.state.drogarias.map((item, key) => (
                                    (item.ativo === 1 && <ListagemEstabelecimento key={key} tipo={'Farmacia'} estabelecimento={item}/>)
                                ))
                            }

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}