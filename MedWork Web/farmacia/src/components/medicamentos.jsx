import React, { Component } from 'react'
import Menu from './template/menu'
import Logotipo from '../images/logotipo.png'
import PesquisarMedicamento from './medicamentos/pesquisar'
import CadastrarMedicamento from './medicamentos/cadastrar'
import ListarMedicamentos from './medicamentos/listar-todos'

class Inicio extends Component {
    constructor() {
        super()
        this.state = {
            abaPesquisar: "nav-link active",
            abaCadastrar: "nav-link",
            abaVerTodos: "nav-link",
            contentPesquisar: "container-fluid",
            contentCadastrar: "d-none",
            contentVerTodos: "d-none"
        }

        this.changeAbaPesquisar = (e) => {
            e.preventDefault()
            this.setState({
                abaPesquisar: "nav-link active",
                abaCadastrar: "nav-link",
                abaVerTodos: "nav-link",
                contentPesquisar: "container-fluid",
                contentCadastrar: "d-none",
                contentVerTodos: "d-none"
            })

        }
        this.changeAbaCadastrar = (e) => {
            e.preventDefault()
            this.setState({
                abaPesquisar: "nav-link",
                abaCadastrar: "nav-link active",
                abaVerTodos: "nav-link",
                contentPesquisar: "d-none",
                contentCadastrar: "container-fluid",
                contentVerTodos: "d-none"
            })
        }
        this.changeAbaVerTodos = (e) => {
            e.preventDefault()
            this.setState({
                abaPesquisar: "nav-link",
                abaCadastrar: "nav-link",
                abaVerTodos: "nav-link active",
                contentPesquisar: "d-none",
                contentCadastrar: "d-none",
                contentVerTodos: "container-fluid"

            })
        }
    }


    render() {
        return (
            < div className='row bg-white' >
                <Menu />
                <div className='container col-md-8 col-lg-9 animate__animated animate__fadeIn animate__fast'>
                    <h2 className='text-center pt-4 font-weight-light'>MEDICAMENTOS</h2>
                    <div>
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <a className={this.state.abaPesquisar} href="#" name='abaPesquisar' onClick={this.changeAbaPesquisar}>Pesquisar</a>
                            </li>
                            <li className="nav-item">
                                <a className={this.state.abaCadastrar} href="#" name='abaCadastrar' onClick={this.changeAbaCadastrar}>Cadastrar</a>
                            </li>
                            <li className="nav-item">
                                <a className={this.state.abaVerTodos} href="#" name='abaCadastrar' onClick={this.changeAbaVerTodos}>Ver todos os medicamentos</a>
                            </li>
                        </ul>
                    </div>

                    <div className={this.state.contentPesquisar}>
                        <PesquisarMedicamento />
                    </div>
                    <div className={this.state.contentCadastrar}>
                        <CadastrarMedicamento />
                    </div>
                    <div className={this.state.contentVerTodos}> 
                        <ListarMedicamentos />
                    </div>




                </div>
            </div >
        )
    }
}

export default Inicio