import React from 'react';
import { deslogar } from '../../main/api/deslogar';
import Logotipo from './logotipo-dash'
import './menu.css'

export default props => (
    <div className="Menu col-md-4 col-lg-3 d-none d-lg-block">
        <a href="#/pedidos"><h4 className='text-center'><Logotipo /></h4></a>
        <a href="#/pedidos">
            <i className="shipping fast icon mr-3"></i>
             Pedidos
        </a>
        <a href="#/medicamentos">
            <i className="pills icon mr-3"></i>
            Medicamentos
        </a>
        <a href="#/informacoes-da-empresa">
            <i className="building icon mr-3"></i>
            Informações da empresa
        </a>
        <a href="#/centro-de-ajuda">
            <i className="question circle outline icon mr-3"></i>
            Centro de ajuda
        </a>
        {/* <a href="#/configuracoes">
            <i className="cog icon mr-3"></i>
            Configurações
        </a> */}
        <a className="fixed-bottom" onClick={deslogar} style={{width: (window.innerWidth/12)*3}} href="#"  >
            <i className="sign-out icon mr-3"></i>
            Sair
        </a>
    </div>
)