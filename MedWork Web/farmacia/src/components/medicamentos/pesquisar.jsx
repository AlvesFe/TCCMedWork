import React, { Component } from 'react'
import getRemedio from '../../main/api/getRemedio'
import MedicamentoNaoEncontrado from '../template/ProcurarMedicamentoErro'

export default class PesquisarMedicamento extends Component {

    constructor() {
        super()
        this.state = {
            medicamentoErro: "d-none",
            codigo: "",
        }

        this.onChange = (e) => {
            const state = Object.assign({}, this.state)
            const campo = e.target.name
            state[campo] = e.target.value
            this.setState(state)
        }

        this.buscarMedicamento = (e) => {
            e.preventDefault()
            getRemedio(this.state).then(res => {
                if(!res[0]){
                    this.setState({
                        medicamentoErro: "col-12 animate__animated animate__fadeIn animate__fast",

                    })
                }
                else{
                    this.setState({
                        medicamentoErro: "d-none"
                    })
                }
            })
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
                    <input type="text" className="form-control " placeholder='Digite o código do medicamento' aria-describedby="button-buscar" id="codigo" name='codigo' onChange={this.onChange}/>
                    <div className="input-group-append">
                        <button className="btn-roxo" type="button" id="button-buscar" onClick={this.buscarMedicamento}>Buscar</button>
                    </div>
                </div>
            </div>
            </div>
        )
    }

}