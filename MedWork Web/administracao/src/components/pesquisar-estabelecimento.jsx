import React, { Component } from 'react';
import getEstabelecimentos from '../main/api/getEstabelecimentos';
import InputMask from 'react-input-mask';
import Menu from './template/menu'
import Event from '../event/Alerts';

class PesquisarEstabelecimento extends Component {

    constructor() {
        super()
        this.state = {
            cnpj: "",
            pesquisa: "alert alert-danger text-center d-none"
        }
        this.onChange = (e) => {
            const state = Object.assign({}, this.state)
            const campo = e.target.name
            state[campo] = e.target.value
            this.setState(state)
        }
        this.onSubmit = (e) => {
            e.preventDefault()
            getEstabelecimentos(this.state.cnpj)
            .then(res => {
                if (res.Estabelecimento) {
                    switch (res.Estabelecimento) {
                        case "hospital":
                            window.location.assign('#/alterar-hospital')
                            break;

                        case "farmacia":
                            window.location.assign('#/alterar-drogaria')
                            break;

                        default:
                            this.setState({
                                pesquisa: "alert alert-danger text-center"
                            })
                            Event("Não Encontrado")
                            break;
                    }    
                }else{
                    this.setState({
                        pesquisa: "alert alert-danger text-center animate__animated animate__fadeIn animate__fast"
                    })
                    Event("Não Encontrado")
                }
            })
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
                            <div>
                                <div className={this.state.pesquisa} role="alert">
                                    CNPJ NÃO CADASTRADO!
                                </div>
                            </div>
                            <label htmlFor="pesquisarEstabelecimento" className='font-weight-bold mb-0'>CNPJ</label>
                            <InputMask mask="99.999.999/9999-99" className="form-control form-control-lg" id="pesquisarEstabelecimento" name="cnpj" placeholder='__.___.___/____-__' value={this.state.cnpj} onChange={this.onChange} />
                            <div className='text-center py-3'>
                                <button className='btn-roxo' onClick={this.onSubmit}>PESQUISAR</button>
                            </div>
                        </div>
                    </div>
                    <div className='text-center container pt-5'>
                        <a className='btn-roxo my-1' href='#/ver-todos-estabelecimentos'>VER TODOS (GERAL)</a>
                        <a className='btn-roxo mx-4 my-1' href='#/ver-hospitais'>VER TODOS (HOSPITAIS)</a>
                        <a className='btn-roxo my-1' href='#/ver-drogarias'>VER TODOS (DROGARIAS)</a>
                    </div>
                </div>
            </div >
        )
    }
}

export default PesquisarEstabelecimento