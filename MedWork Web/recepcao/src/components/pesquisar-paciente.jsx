import React, { Component } from 'react';
import getPaciente from '../main/api/getPaciente';
import InputMask from 'react-input-mask';
import Menu from './template/menu'

class PesquisarPaciente extends Component {

    constructor() {
        super()
        this.state = {
            cpf: "",
        }
        this.onChange = (e) => {
            const state = Object.assign({}, this.state)
            const campo = e.target.name
            state[campo] = e.target.value
            this.setState(state)
        }
        this.onSubmit = (e) => {
            e.preventDefault();
            getPaciente(this.state.cpf).then(res => {
                let data = res.dt_Nascimento.slice(0,-14)
                data = Date.parse(data)
                data = new Date(data)
                data = ((data.getDate())) + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear()
                console.log(data)
            })
        }
    }

    render() {
        return (
            < div className='row bg-white' >
                <Menu />
                <div className='container col-md-8 col-lg-9 pt-4 animate__animated animate__fadeIn animate__fast'>
                    <h2 className='text-center font-weight-light'>PESQUISAR PACIENTE</h2>
                    <div className='row justify-content-center py-5'>
                        <div className="col-8 py-5">
                            <label htmlFor="pesquisarPaciente" className='font-weight-bold mb-0'>CPF</label>
                            <InputMask mask="999.999.999-99" className="form-control form-control-lg" id="pesquisarPaciente" name="cpf" placeholder='123.456.789-10' value={this.state.cpf} onChange={this.onChange}  />
                            <div className='text-center py-3'>
                                <button className='btn-roxo'  onClick={this.onSubmit}>PESQUISAR</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default PesquisarPaciente