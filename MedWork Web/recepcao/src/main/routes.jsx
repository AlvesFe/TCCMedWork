import React from 'react';
import { Router, Route, Redirect, hashHistory } from 'react-router'

import Login from '../components/login/Login'
import Recuperacao from '../components/login/Recuperacao'
import PesquisarPaciente from '../components/pesquisar-paciente'
import VerPaciente from '../components/ver-paciente'
import Pesquisa from '../components/pesquisa-efetivada'
import Encaminhamento from '../components/encaminhamento'
import CadastrarPaciente from '../components/cadastrar-paciente'
import CentroAjuda from '../components/centro-ajuda'
import ValidacaoCodigo from '../components/login/Confirmar'
import RedefinirSenha from '../components/login/Redefinir-senha'
import MinhasInformacoes from '../components/minhas-informacoes'
import { isAuth } from './auth';
import Confirmar from '../components/login/Confirmar';

export default function routes() {
    if (isAuth()) {
        return (
            <Router history={hashHistory}>
                <Route path='/inicio' component={PesquisarPaciente} />
                <Route path='/esqueci-minha-senha' component={Recuperacao} />
                <Route path='/pesquisar-paciente' component={PesquisarPaciente} />
                <Route path='/ver-paciente' component={VerPaciente} />
                <Route path='/pesquisa' component={Pesquisa} />
                <Route path='/encaminhamento' component={Encaminhamento} />
                <Route path='/cadastrar-paciente' component={CadastrarPaciente} />
                <Route path='/centro-de-ajuda' component={CentroAjuda} />
                <Route path='/minhas-informacoes' component={MinhasInformacoes} />
                <Route path='/sair' component={PesquisarPaciente} />
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
                <Route path='/termo-uso-e-privacidade' component={Login} />
                <Redirect from='*' to='/login' />
            </Router>
        );
    }
}