import React, { Component } from 'react';
import Menu from './template/menu'
import Logotipo from '../images/logotipo.png'

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
                <div className='container col-md-8 col-lg-9 animate__animated animate__fadeIn animate__fast'>
                    <h2 className='text-center pt-4 font-weight-light'>INÍCIO</h2>

                    <div className='text-center'>
                        <img src={Logotipo} width='400px' alt=""/>
                    </div>
                    


                </div>
            </div >
        )
    }
}

export default PacientesEmEspera