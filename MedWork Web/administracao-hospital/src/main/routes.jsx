import React from 'react';
import { Router, Route, Redirect, hashHistory } from 'react-router'
import './auth'

import Login from '../components/login/Login'
import Recuperacao from '../components/login/Recuperacao'
import PesquisarMedico from '../components/pesquisar-medico'
import CadastrarMedico from '../components/cadastrar-medico'
import CadastrarRecepcionista from '../components/cadastrar-recepcionista'
import CentroAjuda from '../components/centro-ajuda'
import Configuracoes from '../components/configuracoes'

const PrivateRoute = ({ component: Component, ...rest }) => (

    <Route {...rest} render={
        props => (
            isAuth() ? (
                <Component {...props} />
            ) : (
                    <Redirect to={{ pathname: '/login' }} />
                )
        )
    } />
)

export default props => (
    <Router history={hashHistory}>
        <Route path='/login' component={Login} />
        <Route path='/esqueci-minha-senha' component={Recuperacao} />
        <Route path='/termo-uso-e-privacidade' component={Login} />
        <PrivateRoute path='/inicio' component={PesquisarMedico} />
        <PrivateRoute path='/pesquisar-medico' component={PesquisarMedico} />
        <PrivateRoute path='/cadastrar-medico' component={CadastrarMedico} />
        <PrivateRoute path='/cadastrar-recepcionista' component={CadastrarRecepcionista} />
        <PrivateRoute path='/centro-de-ajuda' component={CentroAjuda} />
        <PrivateRoute path='/configuracoes' component={Configuracoes} />
        <PrivateRoute path='/sair' component={PesquisarMedico} />
        <Redirect from='*' to='/login' />
    </Router>
)