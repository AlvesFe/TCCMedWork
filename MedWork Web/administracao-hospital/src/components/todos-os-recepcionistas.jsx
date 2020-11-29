import React, { Component } from 'react'
import getAllRecepcionista from '../main/api/getAllRecepcionista';
import ListarFuncionarios from './template/listar-funcionário'
import Menu from './template/menu'

class TodosOsRecepcionista extends Component {

    constructor() {
        super()
        this.state = {
            recepcionista: []
        }
        getAllRecepcionista().then(res => {
            this.setState({ recepcionista: res.data })
        });
    }
    render() {
        return (
            <div className='row bg-white'>
                <Menu />
                <div className='container col-md-8 col-lg-9 pt-4 animate__animated animate__fadeIn animate__fast'>
                    <h2 className='text-center font-weight-light'>TODOS OS RECEPCIONISTAS</h2>
                    <div>
                        <ListarFuncionarios />
                        {
                            this.state.recepcionista[0] &&
                            console.log(this.state.recepcionista)
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default TodosOsRecepcionista;
