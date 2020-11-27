import React, { Component } from 'react';
import ListagemEstabelecimento from './template/listagem-estabelecimento'
import cadastrarFarmacia from '../main/api/cadastrarFarmacia';
import getHospital from '../main/api/getHospital';
import Menu from './template/menu'

export default class ListarEstabelecimento extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hospitais: [],
        }
        getHospital().then(response => {
            this.setState({hospitais: response})
        })
    }

    render() {

        return (
            <div className='row bg-white'>
                <Menu />
                <div className='container-fluid col-md-8 col-lg-9 pt-4 animate__animated animate__fadeIn animate__fast'>
                    <h2 className='text-center font-weight-light'>VER TODOS OS HOSPITAIS</h2>
                    <div className='row justify-content-center py-3'>
                        <div className="col-12 py-3 form-row">

                            {   this.state.hospitais[0] &&
                                this.state.hospitais.map((item, key) => (
                                    (item.ativo === 1 && <ListagemEstabelecimento key={key} tipo={'Hospital'} estabelecimento={item}/>)
                                ))
                            }

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}