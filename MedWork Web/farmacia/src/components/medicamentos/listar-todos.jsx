import React, { Component } from 'react'
import getAllRemedios from '../../main/api/getAllRemedios'

export default class ListarMedicamentos extends Component {

    constructor() {
        super()
        this.state = {
            remedio: ""
        }
        getAllRemedios().then(res => {
            this.setState({ remedio: res.remedios })
        })
       
    }


    render() {

        return (
            <div className='container-fluid pt-2'>

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
                                return (
                                    <tr key={key} >
                                        <th scope="row">{item.codigo}</th>
                                        <td>{item.nome}</td>
                                        <td>{item.tarja}</td>
                                        <td>{item.preco}</td>
                                        <td className='text-center'>
                                            <button className='btn btn-sm btn-primary mr-1'>
                                                <i className="pencil alternate icon"></i>
                                            </button >
                                            <button className='btn btn-sm btn-danger' >
                                                <i className="trash alternate outline icon"></i>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>


            </div>
        )
    }

}