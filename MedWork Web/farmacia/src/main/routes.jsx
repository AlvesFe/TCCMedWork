import React from 'react';
import { Router, Route, Redirect, hashHistory } from 'react-router'

import Login from '../components/login/Login'
import Recuperacao from '../components/login/Recuperacao'
import Inicio from '../components/pedidos'
import Medicamentos from '../components/medicamentos'
import InformacoesEmpresa from '../components/informacoes-empresa'
import PrescricaoGerada from '../components/prescricao-gerada'
import TodosOsMedicamentos from '../components/todos-os-medicamentos'
import CentroAjuda from '../components/centro-ajuda'
import Configuracoes from '../components/configuracoes'
import ValidacaoCodigo from '../components/login/Confirmar'
import RedefinirSenha from '../components/login/Redefinir-senha'
import { isAuth } from './auth';

export default function routes() {
    if (isAuth()) {
        return (
            <Router history={hashHistory}>
                <Route path='/pedidos' component={Inicio} />
                <Route path='/esqueci-minha-senha' component={Recuperacao} />
                <Route path='/todos-os-medicamentos' component={TodosOsMedicamentos} />
                <Route path='/medicamentos' component={Medicamentos} />
                <Route path='/informacoes-da-empresa' component={InformacoesEmpresa} />
                <Route path='/prescricao-gerada' component={PrescricaoGerada} />
                <Route path='/centro-de-ajuda' component={CentroAjuda} />
                {/* <Route path='/configuracoes' component={Configuracoes} /> */}
                <Route path='/sair' component={Login} />
                <Redirect from='*' to='/pedidos' />
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
                <Route path='/termo-uso-e-privacidade' component={Login} />
                <Redirect from='*' to='/login' />
            </Router>
        );
    }

}

