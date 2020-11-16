import React from 'react';
import { Router, Route, Redirect, hashHistory } from 'react-router'
import './auth'

import Login from '../components/login/Login'
import Recuperacao from '../components/login/Recuperacao'
import PesquisarPaciente from '../components/pesquisar-paciente'
import Pesquisa from '../components/pesquisa-efetivada'
import Encaminhamento from '../components/encaminhamento'
import CadastrarPaciente from '../components/cadastrar-paciente'
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
        <PrivateRoute path='/inicio' component={PesquisarPaciente} />
        <PrivateRoute path='/pesquisar-paciente' component={PesquisarPaciente} />
        <PrivateRoute path='/pesquisa' component={Pesquisa} />
        <PrivateRoute path='/encaminhamento' component={Encaminhamento} />
        <PrivateRoute path='/cadastrar-paciente' component={CadastrarPaciente} />
        <PrivateRoute path='/cadastrar-recepcionista' component={CadastrarRecepcionista } />
        <PrivateRoute path='/centro-de-ajuda' component={CentroAjuda} />
        <PrivateRoute path='/configuracoes' component={Configuracoes} />
        <PrivateRoute path='/sair' component={PesquisarPaciente} />
        <Redirect from='*' to='/login' />
    </Router>
)