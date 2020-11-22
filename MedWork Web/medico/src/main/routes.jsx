import React from 'react';
import { Router, Route, Redirect, hashHistory } from 'react-router'
import { isAuth } from './auth';

import Login from '../components/login/Login'
import Recuperacao from '../components/login/Recuperacao'
import PacientesEmEspera from '../components/pacientes-em-espera'
import Atendimento from '../components/atendimento'
import MinhasInformacoes from '../components/minhas-informacoes'
import PrescricaoGerada from '../components/prescricao-gerada'
import Encaminhamento from '../components/encaminhamento'
import CentroAjuda from '../components/centro-ajuda'
import Configuracoes from '../components/configuracoes'

export default function routes() {
    if (isAuth()) {
        return (
            <Router history={hashHistory}>
                <Route path='/inicio' component={PacientesEmEspera} />
                <Route path='/esqueci-minha-senha' component={Recuperacao} />
                <Route path='/termo-uso-e-privacidade' component={Login} />
                <Route path='/pacientes-em-espera' component={PacientesEmEspera} />
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
                <Route path='/termo-uso-e-privacidade' component={Login} />
                <Redirect from='*' to='/login' />
            </Router>
        );
    }

}

