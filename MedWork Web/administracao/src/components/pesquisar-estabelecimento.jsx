import React, { Component } from 'react';
import Menu from './template/menu'

class PesquisarEstabelecimento extends Component {

    constructor() {
        super()
        this.state = {
            cnpj: "",
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
                    <h2 className='text-center font-weight-light'>PESQUISAR ESTABELECIMENTO</h2>
                    <div className='row justify-content-center py-5'>
                        <div className="col-8 py-5">
                            <label htmlFor="pesquisarEstabelecimento" className='font-weight-bold mb-0'>CNPJ</label>
                            <input type="number" className="form-control form-control-lg" id="pesquisarEstabelecimento" name="cnpj" placeholder='61.585.865/0240-93' value={this.state.cnpj} onChange={this.onChange}  />
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

export default PesquisarEstabelecimento