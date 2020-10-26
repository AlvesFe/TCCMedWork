import 'modules/font-awesome/css/font-awesome.min.css'
import 'modules/bootstrap/dist/css/bootstrap.min.css'
import 'modules/animate.css/animate.css'
import './app.css'


import React from 'react';
import Menu from '../paciente/paciente-sistema/template/menu'
import MenuSm from '../paciente/paciente-sistema/template/menu-sm'
import Routes from './routes'

export default props => (
    <div className='row'>
            <Menu />
            <MenuSm />
            <Routes />
    </div>
)