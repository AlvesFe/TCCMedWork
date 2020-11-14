import React from 'react';
import { Router, Route, Redirect, hashHistory } from 'react-router'
import './auth'

import Login from '../components/login/Login'
import Recuperacao from '../components/login/Recuperacao'
import PesquisarEstabelecimento from '../components/pesquisar-estabelecimento'
import CadastrarHospital from '../components/cadastrar-hospital'
import CadastrarDrogaria from '../components/cadastrar-drogaria'
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
        <PrivateRoute path='/inicio' component={PesquisarEstabelecimento} />
        <PrivateRoute path='/pesquisar-estabelecimento' component={PesquisarEstabelecimento} />
        <PrivateRoute path='/cadastrar-hospital' component={CadastrarHospital} />
        <PrivateRoute path='/cadastrar-drogaria' component={CadastrarDrogaria} />
        <PrivateRoute path='/centro-de-ajuda' component={CentroAjuda} />
        <PrivateRoute path='/configuracoes' component={Configuracoes} />
        <PrivateRoute path='/sair' component={PesquisarEstabelecimento} />
        <Redirect from='*' to='/login' />
    </Router>
)