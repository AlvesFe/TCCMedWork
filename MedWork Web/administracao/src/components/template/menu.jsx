import React from 'react';

import Logotipo from './logotipo-dash'
import './menu.css'

function deslogar() {
    localStorage.removeItem('current_user')
    window.location.reload(true);
}

export default props => (
    <div className="Menu col-md-4 col-lg-3 d-none d-lg-block">
        <a href="#/inicio"><h4 className='text-center'><Logotipo /></h4></a>
        <a href="#/pesquisar-estabelecimento">
            <i className="search icon mr-3"></i>
             Pesquisar estabelecimento
        </a>
        <a href="#cadastrar-hospital">
            <i className="hospital outline icon mr-3"></i>
            Cadastrar hospital
        </a>
        <a href="#/cadastrar-drogaria">
            <i className="pills icon mr-3"></i>
            Cadastrar drogaria
        </a>0/#/login
        <a href="#/centro-de-ajuda">
            <i className="question circle outline icon mr-3"></i>
            Centro de ajuda
        </a>
        {/* <a href="#/configuracoes">
            <i className="cog icon mr-3"></i>
            Configurações
        </a> */}
        <a href="#" onClick={deslogar}>
            <i className="sign-out icon mr-3"></i>
            Sair
        </a>
    </div>
)