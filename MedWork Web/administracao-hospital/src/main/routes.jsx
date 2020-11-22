import React from 'react';
import { Router, Route, Redirect, hashHistory } from 'react-router'

import Login from '../components/login/Login'
import Recuperacao from '../components/login/Recuperacao'
import PesquisarMedico from '../components/pesquisar-medico'
import CadastrarMedico from '../components/cadastrar-medico'
import CadastrarRecepcionista from '../components/cadastrar-recepcionista'
import CentroAjuda from '../components/centro-ajuda'
import Configuracoes from '../components/configuracoes'
import { isAuth } from './auth';

export default function routes() {
    if (isAuth()) {
        return(
            <Router history={hashHistory}>
                <Route path='/inicio' component={PesquisarMedico} />
                <Route path='/pesquisar-medico' component={PesquisarMedico} />
                <Route path='/cadastrar-medico' component={CadastrarMedico} />
                <Route path='/cadastrar-recepcionista' component={CadastrarRecepcionista } />
                <Route path='/centro-de-ajuda' component={CentroAjuda} />
                {/* <Route path='/configuracoes' component={Configuracoes} /> */}
                {/* <Route path='/sair' component={PesquisarMedico} /> */}
                <Redirect from='*' to='/inicio' />
            </Router>
        )
    }
    else{
        return(
            <Router history={hashHistory}>
                <Route path='/login' component={Login} />
                <Route path='/esqueci-minha-senha' component={Recuperacao} />
                <Route path='/termo-uso-e-privacidade' component={Login} />
                <Redirect from='*' to='/login' />
            </Router>
        )
    }
} 