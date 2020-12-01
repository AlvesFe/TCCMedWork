import React, { Component } from 'react'
import Menu from './template/menu'
import Logotipo from '../images/logotipo.png'
import PesquisarMedicamento from './medicamentos/pesquisar'
import CadastrarMedicamento from './medicamentos/cadastrar'
import ListarMedicamentos from './medicamentos/listar-todos'
import Abas from './template/Abas'

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
                <div className='container col-md-8 col-lg-9'>
                    <h2 className='text-center pt-4 font-weight-light'>MEDICAMENTOS</h2>
                    <div>
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <a className="nav-link active" href="#/medicamentos" name='abaPesquisar' >Pesquisar</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#/cadastrar-medicamento" name='abaCadastrar' >Cadastrar</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#/todos-os-medicamentos" name='abaCadastrar'>Ver todos os medicamentos</a>
                            </li>
                        </ul>
                    </div>
                    <div className=' animate__animated animate__fadeIn animate__fast'>
                        <PesquisarMedicamento />
                    </div>



                </div>
            </div >
        )
    }
}

export default Inicio