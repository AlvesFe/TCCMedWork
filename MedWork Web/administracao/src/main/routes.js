import React from 'react';
import { Router, Route, Redirect, hashHistory } from 'react-router'
import { isAuth } from "./auth";

import Login from '../components/login/Login'
import Recuperacao from '../components/login/Recuperacao'
import PesquisarEstabelecimento from '../components/pesquisar-estabelecimento'
import CadastrarHospital from '../components/cadastrar-hospital'
import CadastrarDrogaria from '../components/cadastrar-drogaria'
import CentroAjuda from '../components/centro-ajuda'
import Configuracoes from '../components/configuracoes'

export default function routes() {
    if (isAuth()) {
        return (
            <Router history={hashHistory}>
                <Route path='/inicio' component={PesquisarEstabelecimento} />
                <Route path='/pesquisar-estabelecimento' component={PesquisarEstabelecimento} />
                <Route path='/cadastrar-hospital' component={CadastrarHospital} />
                <Route path='/cadastrar-drogaria' component={CadastrarDrogaria} />
                <Route path='/centro-de-ajuda' component={CentroAjuda} />
                <Route path='/configuracoes' component={Configuracoes} />
                <Redirect from='*' to="/inicio" />
            </Router>
        )
    }else{
        return(
            <Router history={hashHistory}>
                <Route path='/login' component={Login} />
                <Route path='/esqueci-minha-senha' component={Recuperacao} />
                <Redirect from='*' to="/login" />
            </Router>
        )
    }
}