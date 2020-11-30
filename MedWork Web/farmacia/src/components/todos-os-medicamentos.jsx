import React, { Component } from 'react';
import Menu from './template/menu'

export default class Encaminhamento extends Component {

    constructor() {
        super()
        this.state = {
            nomePaciente: "",
            dataNascimento:"",
            tipoSanguineo:"",
            status: "",
            endereco: "",
            cpf: "",
            rg: "",
            email: "",
            celular: "",
            telefone: "",
            observacoes: ""
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
            <div className='row bg-white'>
                <Menu />
                <div className='container col-md-8 col-lg-9 pt-4 animate__animated animate__fadeIn animate__fast'>
                    <h2 className='text-center font-weight-light'>ENCAMINHAMENTO</h2>

                    <div className='row justify-content-center py-3'>




                    </div>

                </div>
            </div>
        )
    }
}