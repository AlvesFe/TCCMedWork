import React from 'react';
import Menu from './template/menu'

export default props => (
    <div className='row bg-white'>
        <Menu />
        <div className='container col-md-8 col-lg-9 pt-4 animate__animated animate__fadeIn animate__fast'>
            <h2 className='text-center font-weight-light'>CENTRO DE AJUDA</h2>
            <div>
                <ul className="list-group">
                    <li className="list-group-item bg-light text-center">Bem-vindo ao Centro de Ajuda da MedWork</li>
                    <li className="list-group-item">Sobre a MedWork</li>
                    <li className="list-group-item">Como usar a MedWork em tablet ou celular</li>
                    <li className="list-group-item">Como usar a MedWork no computador</li>
                    <li className="list-group-item">Como entrar em contato</li>
                    <li className="list-group-item">Perguntas Frequentes</li>
                    <li className="list-group-item">Notificações</li>
                    <li className="list-group-item">Vantagens em ser cliente</li>
                    <li className="list-group-item">Relação dos hospitais com as drogarias</li>
                    <li className="list-group-item">Segurança e privacidade</li>
                </ul>
            </div>

        </div>
    </div>
)

