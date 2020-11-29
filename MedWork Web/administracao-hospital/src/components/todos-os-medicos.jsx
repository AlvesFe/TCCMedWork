import React, { Component } from 'react'
import getAllMedicos from '../main/api/getAllMedicos';
import ListarFuncionarios from './template/listar-funcionário'
import Menu from './template/menu'

class TodosOsMedicos extends Component {

    constructor() {
        super()
        this.state = {
            medicos: [],
            height: window.innerHeight
        }
        window.onresize = () =>{
            this.setState({
                ...this.state, height: window.innerHeight
            })
        }
        getAllMedicos().then(res => {
            this.setState({ ...this.state, medicos: res.data })
        });
    }
    render() {
        return (
            <div className='row bg-white'>
                <Menu />
                <div className='container col-md-8 col-lg-9 pt-4 animate__animated animate__fadeIn animate__fast overflow-auto' style={{height: this.state.height}}>

                    <h2 className='text-center font-weight-light'>TODOS OS MÉDICOS</h2>
                    <div>
                        {
                            this.state.medicos[0] &&
                            this.state.medicos.map((item, key) =>(
                                <ListarFuncionarios tipo="Médico" funcionario={item} key={key}/>
                            ))
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default TodosOsMedicos;
