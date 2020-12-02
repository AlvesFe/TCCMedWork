import React, {Component} from 'react';
import Menu from './template/menu'

export default class Inicio  extends Component {
    render() {
        return (
            <div className='row bg-white'>
                <Menu />
                <div className='container col-md-8 col-lg-9 pt-4 animate__animated animate__fadeIn animate__fast'>
                    <h1 className='text-center font-weight-light'>BEM-VINDO A MEDWORK!</h1>
                    <div>
                    </div>

                </div>
            </div>
        )
    }


}