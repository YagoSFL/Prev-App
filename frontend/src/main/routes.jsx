import React from 'react'
import { Router, Route, Redirect, hashHistory } from 'react-router'

import ListaClientes from '../home/listaClientes'
import CadastraClientes from '../cadastro/cadastraClientes'

export default props => (
    <Router history={hashHistory}>
        <Route path='/' component={ListaClientes} />
        <Route path='/cadastro' component={CadastraClientes} />
        <Redirect from='*' to='/' />
    </Router>
)