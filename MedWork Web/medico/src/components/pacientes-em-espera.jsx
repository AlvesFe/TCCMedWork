import React, { Component } from 'react';
import Menu from './template/menu'

class PacientesEmEspera extends Component {

    constructor() {
        super()
        this.state = {
            cpf: "",
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
            < div className='row bg-white' >
                <Menu />
                <div className='container col-md-8 col-lg-9 pt-4 animate__animated animate__fadeIn animate__fast'>
                    <h2 className='text-center font-weight-light'>PACIENTES EM ESPERA</h2>
                    <div className="text-center">
                        <span>
                            <i className="square full red icon"></i>EMERGÊNCIA
                        </span>
                        <span className='px-2'>
                            <i className="square full yellow icon"></i>PREFERENCIAL
                        </span>
                        <span>
                            <i className="square outline icon"></i>NORMAL
                        </span>
                    </div>
                    <div className='row justify-content-center py-5'>
                        <div className="col-8 py-5">

                            <div>
                                <div className="ui steps">
                                    <div className="step bg-warning">
                                        <i className="user icon"></i>
                                        <div className="content">
                                            <div className="title">[Nome.paciente]</div>
                                            <div className="description">Descrições iniciais</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="ui steps">
                                    <div className="step bg-danger">
                                        <i className="user icon"></i>
                                        <div className="content">
                                            <div className="title">[Nome.paciente]</div>
                                            <div className="description">Descrições iniciais</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="ui steps">
                                    <div className="step bg-light">
                                        <i className="user icon"></i>
                                        <div className="content">
                                            <div className="title">[Nome.paciente]</div>
                                            <div className="description">Descrições iniciais</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default PacientesEmEspera