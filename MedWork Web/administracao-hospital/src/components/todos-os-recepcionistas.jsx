import React, { Component } from 'react'
import getAllRecepcionista from '../main/api/getAllRecepcionista';
import ListarFuncionarios from './template/listar-funcionário'
import Menu from './template/menu'

class TodosOsRecepcionista extends Component {

    constructor() {
        super()
        this.state = {
            recepcionista: [],
            height: window.innerHeight
        }
        window.onresize = () =>{
            this.setState({
                ...this.state, height: window.innerHeight
            })
        }
        getAllRecepcionista().then(res => {
            this.setState({ ...this.state, recepcionista: res.data })
        });
    }
    render() {
        return (
            <div className='row bg-white'>
                <Menu />
                <div className='container col-md-8 col-lg-9 pt-4 animate__animated animate__fadeIn animate__fast overflow-auto' style={{height: this.state.height}}>
                    <h2 className='text-center font-weight-light'>TODOS OS RECEPCIONISTAS</h2>
                    <div>
                        {
                            this.state.recepcionista[0] &&
                            this.state.recepcionista.map((item, key) =>(
                                <ListarFuncionarios tipo="Recepcionista" funcionario={item} key={key}/>
                            ))
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default TodosOsRecepcionista;