import React, { Component } from 'react';
import Menu from './template/menu'

class PesquisarMedico extends Component {

    constructor() {
        super()
        this.state = {
            crm: "",
        }
        this.onChange = (e) => {
            const state = Object.assign({}, this.state)
            const campo = e.target.name
            state[campo] = e.target.value
            this.setState(state)
        }
        this.onSubmit = (e) => {
            e.preventDefault()
            console.log(this.state)
        }
    }

    render() {
        return (
            < div className='row bg-white' >
                <Menu />
                <div className='container col-md-8 col-lg-9 pt-4 animate__animated animate__fadeIn animate__fast'>
                    <h2 className='text-center font-weight-light'>PESQUISAR MÉDICO</h2>
                    <div className='row justify-content-center py-5'>
                        <div className="col-8 py-5">
                            <label htmlFor="pesquisarMedico" className='font-weight-bold mb-0'>CRM</label>
                            <input type="number" className="form-control form-control-lg" id="pesquisarMedico" name="crm" placeholder='01.234-SP' value={this.state.crm} onChange={this.onChange}  />
                            <div className='text-center py-3'>
                                <button className='btn-roxo'  onClick={this.onSubmit}>PESQUISAR</button>
                            </div>
                        </div>
                    </div>
                    <div className='text-center container pt-5'>
                        <button className='btn-roxo my-1'>VER TODOS(GERAL)</button>
                        <button className='btn-roxo mx-4 my-1'>VER TODOS (HOSPITAIS)</button>
                        <button className='btn-roxo my-1'>VER TODOS (DROGARIAS)</button>

                    </div>
                </div>
            </div >
        )
    }
}

export default PesquisarMedico