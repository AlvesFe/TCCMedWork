import React from 'react';
import Menu from './template/menu'

export default props => (
    <div className='row bg-white'>
        <Menu />
        <div className='container col-md-8 col-lg-9 pt-4 animate__animated animate__fadeIn animate__fast'>
            <h2 className='text-center font-weight-light'>CONFIGURAÇÕES</h2>
            <div>
                <ul className="list-group pt-5">
                    <li className="list-group-item">
                        <div className="btn-group mr-2" role="group" aria-label="First group">
                            <button type="button" className="disabled">SIM</button>
                            <button type="button" className="btn btn-roxo">NÃO</button>
                        </div>
                    Permtir notificações no navegador
                    </li>
                    <li className="list-group-item">
                        <div className="btn-group mr-2" role="group" aria-label="First group">
                            <button type="button" className="disabled">SIM</button>
                            <button type="button" className="btn btn-roxo">NÃO</button>
                        </div>
                    Receber e-mails
                    </li>
                </ul>
            </div>

        </div>
    </div>
)

