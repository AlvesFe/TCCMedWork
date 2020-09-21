import React from 'react';
import './menu.css'


export default props => (
    <div className="Menu col-3 d-none d-lg-block">
        <a href="#/inicio"><h4 className='text-center'>LOGOTIPO</h4></a>
        <a href="#/inicio">
            <i className="fa fa-home fa-lg"></i> Início
        </a>
        <a href="#minhas-informacoes">
            <i className="fa fa-user fa-lg"></i> Minhas informações
        </a>
        <a href="#/ultima-prescricao">
            <i className="fa fa-file-text-o  fa-lg"></i> Última prescrição
        </a>
        <a href="#/historico-de-prescricoes">
            <i className="fa fa-calendar fa-lg"></i> Histórico de prescrições
        </a>
        <a href="#/centro-de-ajuda">
            <i className="fa fa-info-circle fa-lg"></i> Centro de ajuda
        </a>
        <a href="#/configuracoes">
            <i className="fa fa-cog fa-lg"></i>Configurações
        </a>
        <a href="#/sair" className="sair">
            <i className="fa fa-times fa-lg"></i>Sair
        </a>
    </div>
)