import React from 'react';
import { Router, Route, Redirect, hashHistory } from 'react-router'
import { isAuth } from './auth';

import Login from '../components/login/Login'
import Recuperacao from '../components/login/Recuperacao'
import ValidacaoCodigo from '../components/login/Confirmar'
import RedefinirSenha from '../components/login/Redefinir-senha'

import Inicio from '../components/Inicio'
import MinhasInformacoes from '../components/minhas-informacoes'
import HistoricoPrescricoes from '../components/historico-prescricoes'
import BuscarMedicamento from '../components/buscar-medicamento'
import ComprarMedicamento1 from '../components/comprar-passo1'
import ComprarMedicamento2 from '../components/comprar-passo2'
import ComprarMedicamento3Delivery from '../components/comprar-passo3-delivery'
import ComprarMedicamento3Retirar from '../components/comprar-passo3-retirar'
import FinalizacaoDelivery from '../components/FinalizacaoDelivery'
import FinalizacaoCompra from '../components/FinalizacaoCompra'
import VerPrescricao from '../components/visualizar-prescricao'
import CentroAjuda from '../components/centro-ajuda'



export default function routes() {

    if (isAuth()) {
        return (
            <Router history={hashHistory}>
                <Route path='/inicio' component={Inicio} />
                <Route path='/minhas-informacoes' component={MinhasInformacoes} />
                <Route path='/historico-de-prescricoes' component={HistoricoPrescricoes} />
                <Route path='/buscar-medicamento' component={BuscarMedicamento} />
                <Route path='/comprar-passo-1' component={ComprarMedicamento1} />
                <Route path='/comprar-passo-2' component={ComprarMedicamento2} />
                <Route path='/comprar-passo-3-delivery' component={ComprarMedicamento3Delivery} />
                <Route path='/comprar-passo-3-retirar' component={ComprarMedicamento3Retirar} />
                <Route path='/status-delivery' component={FinalizacaoDelivery} />
                <Route path='/status-compra' component={FinalizacaoCompra} />
                <Route path='/ver-prescricao' component={VerPrescricao} />
                <Route path='/centro-de-ajuda' component={CentroAjuda} />
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
                


                <Redirect from='*' to='/login' />
            </Router>
        );
    }
}