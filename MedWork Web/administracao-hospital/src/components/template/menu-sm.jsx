import React from 'react';
import './menu.css'

function deslogar() {
    localStorage.removeItem('current_user')
    localStorage.removeItem('user_data')
    window.location.reload();
}

export default props => (
    <div className="Menu-sm fixed-bottom d-block d-lg-none">
        <a href="#/inicio">
            <i className="fa fa-home fa-2x"></i>
        </a>
        <a href="#minhas-informacoes">
            <i className="fa fa-user fa-2x"></i>
        </a>
        <a href="#/ultima-prescricao">
            <i className="fa fa-file-text-o  fa-2x"></i>
        </a>
        <a href="#/historico-de-prescricoes">
            <i className="fa fa-calendar fa-2x"></i>
        </a>
        <a href="#/centro-de-ajuda">
            <i className="fa fa-info-circle fa-2x"></i>
        </a>
        {/* <a href="#/configuracoes">
            <i className="fa fa-cog fa-2x"></i>
        </a> */}
        <a href="#" onClick={deslogar}>
            <i className="fa fa-times fa-2x"></i>
        </a>
    </div>
)