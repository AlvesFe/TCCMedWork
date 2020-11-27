import React from 'react';
import { Router, Route, Redirect, hashHistory } from 'react-router'
import { isAuth } from "./auth";

import Login from '../components/login/Login'
import Recuperacao from '../components/login/Recuperacao'
import ValidacaoCodigo from '../components/login/Confirmar'
import RedefinirSenha from '../components/login/Redefinir-senha'
import PesquisarEstabelecimento from '../components/pesquisar-estabelecimento'
import AlterarDrogaria from '../components/alterar-estabelecimentos/alterar-drogaria'
import AlterarHospital from '../components/alterar-estabelecimentos/alterar-hospital'
import ListarTodosEstabelecimentos from '../components/listar-todos-estabelecimentos'
import ListarHospitais from '../components/listar-hospitais'
import ListarDrogarias from '../components/listar-drogarias'
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
                <Route path='/alterar-drogaria' component={AlterarDrogaria} />
                <Route path='/alterar-hospital' component={AlterarHospital} />
                <Route path='/ver-todos-estabelecimentos' component={ListarTodosEstabelecimentos} />
                <Route path='/ver-hospitais' component={ListarHospitais} />
                <Route path='/ver-drogarias' component={ListarDrogarias} />
                <Route path='/cadastrar-hospital' component={CadastrarHospital} />
                <Route path='/cadastrar-drogaria' component={CadastrarDrogaria} />
                <Route path='/centro-de-ajuda' component={CentroAjuda} />
                {/* <Route path='/configuracoes' component={Configuracoes} /> */}
                <Redirect from='*' to="/inicio" />
            </Router>
        )
    }else{
        return(
            <Router history={hashHistory}>
                <Route path='/login' component={Login} />
                <Route path='/esqueci-minha-senha' component={Recuperacao} />
                <Route path='/confirmar' component={ValidacaoCodigo} />
                <Route path='/redefinir-senha' component={RedefinirSenha} />
                <Redirect from='*' to="/login" />
            </Router>
        )
    }
}