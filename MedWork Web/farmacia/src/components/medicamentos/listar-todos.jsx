import React, { Component } from 'react'
import getAllRemedios from '../../main/api/getAllRemedios'
import Menu from '../template/menu'


export default class ListarMedicamentos extends Component {

    constructor(props) {
        super(props)
        this.state = {
            remedio: ""
        }

        getAllRemedios().then(res => {
            this.setState({ remedio: res.remedios })
            console.log(this.state);
        })
    }

    render() {

        return (

            < div className='row bg-white' >
                <Menu />
                <div className='container col-md-8 col-lg-9'>
                    <h2 className='text-center pt-4 font-weight-light'>CADASTRAR MEDICAMENTOS</h2>
                    <div>
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <a className="nav-link " href="#/medicamentos" name='abaPesquisar' >Pesquisar</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link " href="#/cadastrar-medicamento" name='abaCadastrar' >Cadastrar</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href="#/todos-os-medicamentos" name='abaCadastrar'>Ver todos os medicamentos</a>
                            </li>
                        </ul>
                    </div>
                        <div className='container-fluid pt-2 animate__animated animate__fadeIn animate__fast'>

                            <table className="table table-hover">
                                <thead className='bg-light'>
                                    <tr className='text-center'>
                                        <th scope="col">CÓD</th>
                                        <th scope="col">NOME</th>
                                        <th scope="col">TARJA</th>
                                        <th scope="col">PREÇO</th>
                                        <th scope="col" className='text-center'>AÇÃO</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.remedio[0] &&
                                        this.state.remedio.map((item, key) => {
                                            console.log(item);
                                            return (
                                                <tr key={key} className='text-center text-capitalize' >
                                                    <th scope="row">{item.codigo}</th>
                                                    <td>{item.nome}</td>
                                                    <td>{item.tarja}</td>
                                                    <td>R${item.preco}</td>
                                                    <td className='text-center'>
                                                        <a href='#/alterar-medicamento' className='btn btn-sm btn-primary mr-1'>
                                                            <i className="pencil alternate icon"></i>
                                                        </a >
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>


                        </div>
                </div>
            </div>


        )
    }

}