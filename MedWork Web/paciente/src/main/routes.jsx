import React from 'react';
import { Router, Route, Redirect, hashHistory } from 'react-router'
import { isAuth } from './auth';

import Login from '../components/login/Login'
import Recuperacao from '../components/login/Recuperacao'
import ValidacaoCodigo from '../components/login/Confirmar'
import RedefinirSenha from '../components/login/Redefinir-senha'

import Inicio from '../components/Inicio'
import MinhasInformacoes from '../components/minhas-informacoes'
import HistoricoPrescricoes from '../components/historico-prescricoes'
import CentroAjuda from '../components/centro-ajuda'



export default function routes() {

    if (isAuth()) {
        return (
            <Router history={hashHistory}>
                <Redirect from='*' to='/inicio' />
                <Route path='/inicio' component={Inicio} />
                <Route path='/minhas-informacoes' component={MinhasInformacoes} />
                <Route path='/historico-de-prescricoes' component={HistoricoPrescricoes} />
                <Route path='/centro-de-ajuda' component={CentroAjuda} />
            </Router>
        );
    }
    else {
        return (
            <Router history={hashHistory}>
                <Route path='/login' component={Login} />
                <Route path='/esqueci-minha-senha' component={Recuperacao} />
                <Route path='/confirmar' component={ValidacaoCodigo} />
                <Route path='/redefinir-senha' component={RedefinirSenha} />
                


                <Redirect from='*' to='/login' />
            </Router>
        );
    }
}