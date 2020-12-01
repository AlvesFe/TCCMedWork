import React, { Component } from 'react'
import MedicamentoNaoEncontrado from '../template/ProcurarMedicamentoErro'

export default class PesquisarMedicamento extends Component {

    constructor() {
        super()
        this.state = {
            medicamentoErro: "d-none",
        }

        this.buscarMedicamento = (e) => {
            e.preventDefault()
                if (true) {
                    this.setState({
                        medicamentoErro: "col-12 animate__animated animate__fadeIn animate__fast",

                    })
                }
                else {
                    this.setState({
                        medicamentoErro: "d-none"
                    })
                    console.log('Busca aí mané')
                }


        }

    }


    render() {

        return (
            <div className='row justify-content-center py-5'>

            <div className='col-8'>
                <div className={this.state.medicamentoErro}>
                    <MedicamentoNaoEncontrado />
                </div>
                <div className="input-group mb-3">
                    <input type="text" className="form-control " placeholder='Digite o código do medicamento' aria-describedby="button-buscar" id="cpf" name='cpf'/>
                    <div className="input-group-append">
                        <button className="btn-roxo" type="button" id="button-buscar" onClick={this.buscarMedicamento}>Buscar</button>
                    </div>
                </div>
            </div>
            </div>
        )
    }

}