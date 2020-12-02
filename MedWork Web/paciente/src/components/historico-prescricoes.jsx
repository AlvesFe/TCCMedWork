import React, {Component} from 'react';
import Menu from './template/menu'

export default class HistoricoDePrescricoes  extends Component {
    render() {
        return (
            <div className='row bg-white'>
                <Menu />
                <div className='container col-md-8 col-lg-9 pt-4 animate__animated animate__fadeIn animate__fast'>
                    <h1 className='text-center font-weight-light'>HISTÓRICO DE PRESCRIÇÕES</h1>
                    <div>
                        <h1></h1>
                    </div>

                </div>
            </div>
        )
    }


}