import React, { Component } from 'react';
import getAllEstabelecimentos from '../main/api/getAllEstabelecimentos';
import getEstabelecimentos from '../main/api/getEstabelecimentos';
import InputMask from 'react-input-mask';
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
            getEstabelecimentos(this.state.cnpj).then(response =>  {
                console.log(response);
            });
        }
        this.onSubmitAll = (e) => {
            e.preventDefault();
            getAllEstabelecimentos().then(response => {
                console.log(response);
            });
        }
    }

    render() {
        return (
            < div className='row bg-white' >
                <Menu />
                <div className='container col-md-8 col-lg-9 pt-4 animate__animated animate__fadeIn animate__fast'>
                    <h2 className='text-center font-weight-light'>PESQUISAR ESTABELECIMENTO</h2>
                    <div className='row justify-content-center'>
                        <div className="col-8 py-2">
                            <label htmlFor="pesquisarEstabelecimento" className='font-weight-bold mb-0'>CNPJ</label>
                            <InputMask mask="99.999.999/9999-99" className="form-control form-control-lg" id="pesquisarEstabelecimento" name="cnpj" placeholder='61.585.865/0240-93' value={this.state.cnpj} onChange={this.onChange} />
                            <div className='text-center py-3'>
                                <button className='btn-roxo'  onClick={this.onSubmit}>PESQUISAR</button>
                            </div>
                        </div>
                    </div>
                    <div className='text-center container pt-5'>
                        <a className='btn-roxo my-1' href='#/ver-todos-estabelecimentos' onClick={this.onSubmitAll}>VER TODOS (GERAL)</a>
                        <a className='btn-roxo mx-4 my-1' href='#/ver-hospitais'>VER TODOS (HOSPITAIS)</a>
                        <a className='btn-roxo my-1' href='#/ver-drogarias'>VER TODOS (DROGARIAS)</a>
                    </div>
                </div>
            </div >
        )
    }
}

export default PesquisarEstabelecimento