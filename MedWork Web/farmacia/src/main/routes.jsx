import React from 'react';
import { Router, Route, Redirect, hashHistory } from 'react-router'

import Login from '../components/login/Login'
import Recuperacao from '../components/login/Recuperacao'
import ValidacaoCodigo from '../components/login/Confirmar'
import RedefinirSenha from '../components/login/Redefinir-senha'

import PedidosPendentes from '../components/pedidos'
import ACaminho from '../components/pedidos/confirmados'
import HistoricoPedidos from '../components/pedidos/historico'


import Medicamentos from '../components/medicamentos'
import CadastrarMedicamento from '../components/medicamentos/cadastrar'
import AlterarMedicamento from '../components/medicamentos/alterar'
import TodosOsMedicamentos from '../components/medicamentos/listar-todos'

import InformacoesEmpresa from '../components/informacoes-empresa'
import CentroAjuda from '../components/centro-ajuda'
import { isAuth } from './auth';

export default function routes() {
    if (isAuth()) {
        return (
            <Router history={hashHistory}>
                <Route path='/pedidos-pendentes' component={PedidosPendentes} />
                <Route path='/a-caminho' component={ACaminho} />
                <Route path='/historico-de-pedidos' component={HistoricoPedidos} />

                <Route path='/esqueci-minha-senha' component={Recuperacao} />
                <Route path='/medicamentos' component={Medicamentos} />
                <Route path='/cadastrar-medicamento' component={CadastrarMedicamento} />
                <Route path='/alterar-medicamento' component={AlterarMedicamento} />
                <Route path='/todos-os-medicamentos' component={TodosOsMedicamentos} />
                <Route path='/informacoes-da-empresa' component={InformacoesEmpresa} />
                <Route path='/centro-de-ajuda' component={CentroAjuda} />
                <Route path='/sair' component={Login} />
                <Redirect from='*' to='/pedidos-pendentes' />
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

