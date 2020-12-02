import React from 'react';
import { Router, Route, Redirect, hashHistory } from 'react-router'
import { isAuth } from './auth';

import Login from '../components/login/Login'
import Recuperacao from '../components/login/Recuperacao'
import ValidacaoCodigo from '../components/login/Confirmar'
import RedefinirSenha from '../components/login/Redefinir-senha'


export default function routes() {

    if (isAuth(false)) {
        return (
            <Router history={hashHistory}>
                <Route path='/inicio' component={Login} />
                <Redirect from='*' to='/inicio' />
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