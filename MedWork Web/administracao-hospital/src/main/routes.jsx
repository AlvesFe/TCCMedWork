import React from 'react';
import { Router, Route, Redirect, hashHistory } from 'react-router'

import Login from '../components/login/Login'
import Recuperacao from '../components/login/Recuperacao'
import ValidacaoCodigo from '../components/login/Confirmar'
import PesquisarFuncionario from '../components/pesquisar-funcionario'
import TodosOsFuncionarios from '../components/todos-os-funcionarios'
import TodosOsMedicos from '../components/todos-os-medicos'
import TodosOsRecepcionistas from '../components/todos-os-recepcionistas'
import AlterarMedico from '../components/alterar-funcionarios/alterar-medico'
import AlterarRecepcionista from '../components/alterar-funcionarios/alterar-recepcionista'
import CadastrarMedico from '../components/cadastrar-medico'
import CadastrarRecepcionista from '../components/cadastrar-recepcionista'
import CentroAjuda from '../components/centro-ajuda'
import Configuracoes from '../components/configuracoes'
import RedefinirSenha from '../components/login/Redefinir-senha'
import { isAuth } from './auth';

export default function routes() {
    if (isAuth()) {
        return(
            <Router history={hashHistory}>
                <Route path='/inicio' component={PesquisarFuncionario} />
                <Route path='/pesquisar-funcionario' component={PesquisarFuncionario} />
                <Route path='/todos-os-funcionarios' component={TodosOsFuncionarios} />
                <Route path='/todos-os-medicos' component={TodosOsMedicos} />
                <Route path='/todos-os-recepcionistas' component={TodosOsRecepcionistas} />
                <Route path='/alterar-medico' component={AlterarMedico} />
                <Route path='/alterar-recepcionista' component={AlterarRecepcionista} />
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
                <Route path='/confirmar' component={ValidacaoCodigo} />
                <Route path='/redefinir-senha' component={RedefinirSenha} />
                <Route path='/termo-uso-e-privacidade' component={Login} />
                <Redirect from='*' to='/login' />
            </Router>
        )
    }
} 