import React, { Component } from 'react'

export default class ListarMedicamentos extends Component {

    constructor() {
        super()
        this.state = {

        }

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
                        <tr >
                            <th scope="row">1</th>
                            <td>Nemezulida</td>
                            <td>Amarela</td>
                            <td>10.90</td>
                            <td className='text-center'>
                                <button className='btn btn-sm btn-primary mr-1'>
                                    <i className="pencil alternate icon"></i>
                                </button >
                                <button className='btn btn-sm btn-danger' >
                                    <i className="trash alternate outline icon"></i>
                                </button>
                            </td>
                        </tr>
                        <tr >
                            <th scope="row">2</th>
                            <td>Gardenal</td>
                            <td>Preta</td>
                            <td>8.90</td>
                            <td className='text-center'>
                                <button className='btn btn-sm btn-primary mr-1'>
                                    <i className="pencil alternate icon"></i>
                                </button >
                                <button className='btn btn-sm btn-danger' >
                                    <i className="trash alternate outline icon"></i>
                                </button>
                            </td>
                        </tr>
                        <tr >
                            <th scope="row">3</th>
                            <td>Nemezulida</td>
                            <td>Amarela</td>
                            <td>15.90</td>
                            <td className='text-center'>
                                <button className='btn btn-sm btn-primary mr-1'>
                                    <i className="pencil alternate icon"></i>
                                </button >
                                <button className='btn btn-sm btn-danger' >
                                    <i className="trash alternate outline icon icon"></i>
                                </button>
                            </td>
                        </tr>


                    </tbody>
                </table>


            </div>
        )
    }

}