import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { reducer as toastrReducer } from 'react-redux-toastr'

import TabReducer from '../common/tab/tabReducer'
import ListaClientesReducer from '../home/listaClientesReducer'

const rootReducer = combineReducers({
    tab: TabReducer,
    listaClientes: ListaClientesReducer,
    form: formReducer,
    toastr: toastrReducer
})

export default rootReducer