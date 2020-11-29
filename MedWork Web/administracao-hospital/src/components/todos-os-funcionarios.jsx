import React, { Component } from 'react'
import getAllMedicos from '../main/api/getAllMedicos';
import getAllRecepcionista from '../main/api/getAllRecepcionista';
import ListarFuncionarios from './template/listar-funcionário'
import Menu from './template/menu'

class TodosOsFuncionarios extends Component {

    constructor() {
        super()
        this.state = {
            medicos: [],
            recepcionistas: [],
            height: window.innerHeight
        }
        window.onresize = () =>{
            this.setState({
                ...this.state, height: window.innerHeight
            })
        }
        getAllMedicos().then(res => {
            const medicos = []
            res.data.forEach(element => {
                medicos.push({...element, tipo: "Médico"})
            }) 
            this.setState({...this.state, medicos})
        });
        getAllRecepcionista().then(res => {
            const recepcionistas = []
            res.data.forEach(element => {
                recepcionistas.push({...element, tipo: "Recepcionista"})
            })
            this.setState({...this.state, recepcionistas})
        });

    }
    
    render() {
        return (
            <div className='row bg-white'>
                <Menu />
                <div className='container col-md-8 col-lg-9 pt-4 animate__animated animate__fadeIn animate__fast overflow-auto' style={{height: this.state.height}}>
                    <h2 className='text-center font-weight-light'>TODOS OS FUNCIONARIOS</h2>
                    <div>
                        {
                            this.state.medicos[0] && 
                            this.state.medicos.map((item, key) => (
                                <ListarFuncionarios key={key} funcionario={item} tipo={item.tipo}/> 
                            ))
                        }
                        {
                            this.state.recepcionistas[0] && 
                            this.state.recepcionistas.map((item, key) => (
                                <ListarFuncionarios key={key} funcionario={item} tipo={item.tipo}/> 
                            ))
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default TodosOsFuncionarios;

function getfunc() {
    const funcionarios = []
    
    return funcionarios   
}