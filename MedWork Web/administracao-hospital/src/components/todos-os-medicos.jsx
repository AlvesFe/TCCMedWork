import React, { Component } from 'react'
import getAllMedicos from '../main/api/getAllMedicos';
import Menu from './template/menu'

class TodosOsMedicos extends Component {

    constructor() {
        super()
        this.state = {
            medicos: []
        }
        getAllMedicos().then(res => {
            this.setState({ medicos: res.data })
        });
    }
    render() {
        return (
            <div className='row bg-white'>
                <Menu />
                <div className='container col-md-8 col-lg-9 pt-4 animate__animated animate__fadeIn animate__fast'>
                    <h2 className='text-center font-weight-light'>TODOS OS MÉDICOS</h2>
                    <div>
                        {
                            this.state.medicos[0] &&
                            console.log(this.state.medicos)
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default TodosOsMedicos;
