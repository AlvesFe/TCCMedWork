import React, { Component } from 'react';
import Menu from './template/menu'

export default class Inicio extends Component {
    render() {
        return (
            <div className='row bg-white'>
                <Menu />
                <div className='container col-md-8 col-lg-9 pt-4 animate__animated animate__fadeIn animate__fast'>
                    <h1 className='text-center font-weight-light'>BEM-VINDO A MEDWORK!</h1>
                    <div className='container'>
                        <h3 className='font-weight-lighter'>
                            Sejam bem-vindo a MedWork, um aplicativo que tem como propósito auxiliar você a comprar os remédios que lhe foram prescritos da melhor forma possível!
                        </h3>

                        <div className='text-center pt-2'>
                            <iframe width="660" height="415" className='border border-muted shadow' src="https://www.youtube.com/embed/PowtAAOnHy0" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                        </div>

                    </div>

                </div>
            </div>
        )
    }


}