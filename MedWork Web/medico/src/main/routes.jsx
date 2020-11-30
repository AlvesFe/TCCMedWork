import React from 'react';
import { Router, Route, Redirect, hashHistory } from 'react-router'
import { isAuth } from './auth';

import Login from '../components/login/Login'
import Recuperacao from '../components/login/Recuperacao'
import Inicio from '../components/inicio'
import Atendimento from '../components/atendimento'
import MinhasInformacoes from '../components/minhas-informacoes'
import PrescricaoGerada from '../components/prescricao-gerada'
import Encaminhamento from '../components/encaminhamento'
import CentroAjuda from '../components/centro-ajuda'
import Configuracoes from '../components/configuracoes'
import ValidacaoCodigo from '../components/login/Confirmar'
import RedefinirSenha from '../components/login/Redefinir-senha'

export default function routes() {
    if (isAuth()) {
        return (
            <Router history={hashHistory}>
                <Route path='/inicio' component={Inicio} />
                <Route path='/esqueci-minha-senha' component={Recuperacao} />
                <Route path='/encaminhamento' component={Encaminhamento} />
                <Route path='/atendimento' component={Atendimento} />
                <Route path='/minhas-informacoes' component={MinhasInformacoes} />
                <Route path='/prescricao-gerada' component={PrescricaoGerada} />
                <Route path='/centro-de-ajuda' component={CentroAjuda} />
                {/* <Route path='/configuracoes' component={Configuracoes} /> */}
                <Route path='/sair' component={Login} />
                <Redirect from='*' to='/inicio' />
            </Router>
        );
    }
    else {
        return (
            <Router history={hashHistory}>
                <Route path='/login' component={Login} />
                <Route path='/esqueci-minha-senha' component={Recuperacao} />
                <Route path='/redefinir-senha' component={RedefinirSenha} />
                <Route path='/confirmar' component={ValidacaoCodigo} />
                <Route path='/termo-uso-e-privacidade' component={Login} />
                <Redirect from='*' to='/login' />
            </Router>
        );
    }

}

