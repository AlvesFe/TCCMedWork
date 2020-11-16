import React from 'react';
import { Router, Route, Redirect, hashHistory } from 'react-router'
import './auth'

import Login from '../components/login/Login'
import Recuperacao from '../components/login/Recuperacao'
import PacientesEmEspera from '../components/pacientes-em-espera'
import Atendimento from '../components/atendimento'
import MinhasInformacoes from '../components/minhas-informacoes'
import PrescricaoGerada from '../components/prescricao-gerada'
import Encaminhamento from '../components/encaminhamento'
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
        <PrivateRoute path='/inicio' component={PacientesEmEspera} />
        <PrivateRoute path='/pacientes-em-espera' component={PacientesEmEspera} />
        <PrivateRoute path='/encaminhamento' component={Encaminhamento} />
        <PrivateRoute path='/atendimento' component={Atendimento} />
        <PrivateRoute path='/minhas-informacoes' component={MinhasInformacoes } />
        <PrivateRoute path='/prescricao-gerada' component={PrescricaoGerada} />
        <PrivateRoute path='/centro-de-ajuda' component={CentroAjuda} />
        <PrivateRoute path='/configuracoes' component={Configuracoes} />
        <PrivateRoute path='/sair' component={Login} />
        <Redirect from='*' to='/login' />
    </Router>
)