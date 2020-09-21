import React from 'react';
import {Router, Route, Redirect, hashHistory} from 'react-router'

import Inicio from '../paciente/paciente-sistema/inicio'
import MinhasInformacoes from '../paciente/paciente-sistema/minhas-informacoes'
import UltimaPrescricao from '../paciente/paciente-sistema/ultima-prescricao'
import Historico from '../paciente/paciente-sistema/historico-prescricoes'
import CentroAjuda from '../paciente/paciente-sistema/centro-ajuda'
import Configuracoes from '../paciente/paciente-sistema/configuracoes'
import Sair from '../paciente/paciente-sistema/sair'

export default props => (
    <Router history={hashHistory}>
        <Route path='/inicio' component={Inicio} />
        <Route path='/minhas-informacoes' component={MinhasInformacoes} />
        <Route path='/ultima-prescricao' component={UltimaPrescricao} />
        <Route path='/historico-de-prescricoes' component={Historico} />
        <Route path='/centro-de-ajuda' component={CentroAjuda} />
        <Route path='/configuracoes' component={Configuracoes} />
        <Route path='/sair' component={Sair} />
        <Redirect from='*' to='/inicio' />
    </Router>
)