import React from 'react';

import Logotipo from './logotipo-dash'
import './menu.css'

export default props => (
    <div className="Menu col-md-4 col-lg-3 d-none d-lg-block">
        <a href="#/inicio"><h4 className='text-center'><Logotipo /></h4></a>
        <a href="#/pacientes-em-espera">
            <i className="users icon mr-3"></i>
             Pacientes em espera
        </a>
        <a href="#atendimento">
            <i className="user icon mr-3"></i>
            Atendimento
        </a>
        <a href="#minhas-informacoes">
            <i className="user icon mr-3"></i>
            Minhas informações
        </a>
        <a href="#/centro-de-ajuda">
            <i className="question circle outline icon mr-3"></i>
            Centro de ajuda
        </a>
        <a href="#/configuracoes">
            <i className="cog icon mr-3"></i>
            Configurações
        </a>
        <a href="#/sair">
            <i className="sign-out icon mr-3"></i>
            Sair
        </a>
    </div>
)