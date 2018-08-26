import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { reset as resetForm, initialize } from 'redux-form'
import { selectTab, showTabs} from '../common/tab/tabActions'

const BASE_URL = 'http://localhost:3003/api'

const INITIAL_VALUES = { situacao: 'ATIVO',
        creditsNormal: [{status: 'PENDENTE'}], creditsAdic: [{}], creditsPort: [{}]}

export function getList() {
    const request = axios.get(`${BASE_URL}/investClients`)
    return {
        type: 'LIST_CLIENTS_FETCHED',
        payload: request
    }
}

export function update(values) {
    return submit(values, 'put')
}

export function exclude(values) {
    return submit(values, 'delete')
}



function submit(values, method) {
    return dispatch => {
        const id = values._id ? values._id : ''
        axios[method](`${BASE_URL}/investClients/${id}`, values)
            .then(resp => {
                toastr.success('Sucesso' ,'Operação Realizada com Sucesso!')
                dispatch([
                    resetForm('clientesForm'),
                    init()
                ])
            })
            .catch(e => {
                e.response.data.errors.forEach(error => toastr.error('Erro', error))
            })
    }
}

export function showUpdate(FormClientes) {

    return [
        showTabs('tabEdit'),
        selectTab('tabEdit'),
        initialize('clientesForm', FormClientes)
    ]
}

export function showDelete(FormClientes) {
    return [
        showTabs('tabDelete'),
        selectTab('tabDelete'),
        initialize('clientesForm', FormClientes)
    ]
}


export function init() {
    return [
        showTabs('tabList', 'tabCreate'),
        selectTab('tabList', 'tabCreate'),
        getList(),
        initialize('clientesForm', INITIAL_VALUES)
    ]
}
