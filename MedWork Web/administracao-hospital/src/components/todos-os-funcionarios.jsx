import React, { Component } from 'react'
import getAllMedicos from '../main/api/getAllMedicos';
import getAllRecepcionista from '../main/api/getAllRecepcionista';
import Menu from './template/menu'

class TodosOsFuncionarios extends Component {

    constructor() {
        super()
        this.state = {
            medicos: [],
            recepcionista: []
        }
        getAllMedicos().then(res => {
            this.setState({ medicos: res.data })
        });
        getAllRecepcionista().then(res => {
            this.setState({ recepcionista: res.data })
        });
    }
    render() {
        return (
            <div className='row bg-white'>
                <Menu />
                <div className='container col-md-8 col-lg-9 pt-4 animate__animated animate__fadeIn animate__fast'>
                    <h2 className='text-center font-weight-light'>TODOS OS FUNCIONARIOS</h2>
                    <div>
                        {
                            this.state.medicos[0] &&
                            console.log(this.state.medicos),
                            this.state.recepcionista[0] &&
                            console.log(this.state.recepcionista)
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default TodosOsFuncionarios;
