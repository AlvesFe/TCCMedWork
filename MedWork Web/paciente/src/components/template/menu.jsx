import React from 'react';
import Logotipo from './logotipo-dash'
import './menu.css'
import {deslogar} from '../../main/api/deslogar'

export default props => (
    <div className="Menu col-md-4 col-lg-3 d-none d-lg-block pl-3">
        <a href="#/inicio"><h4 className='text-center'><Logotipo /></h4></a>
        <a href="#/inicio">
            <i className="home icon mr-3"></i>
             Início
        </a>
        <a href="#minhas-informacoes">
            <i className="user icon mr-3"></i>
            Minhas informações
        </a>
        <a href="#/historico-de-prescricoes">
            <i className="calendar alternate outline icon mr-3"></i>
            Histórico de prescrições
        </a>
        <a href="#/centro-de-ajuda">
            <i className="question circle outline icon mr-3"></i>
            Centro de ajuda
        </a>
        <a className="fixed-bottom" onClick={deslogar} style={{width: (window.innerWidth/12)*3}} href="#">
            <i className="sign-out icon mr-3"></i>
            Sair
        </a>
    </div>
)