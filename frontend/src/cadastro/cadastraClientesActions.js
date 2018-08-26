import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { reset as resetForm, initialize } from 'redux-form'
import { showTabs, selectTab } from '../common/tab/tabActions'
import { init } from '../home/listaClientesActions' 
import { hashHistory } from 'react-router'

const dateformat = require('dateformat')
let curDate = new Date()
let mesA = dateformat(curDate, "mm")
let anoA = dateformat(curDate, "yyyy")

const BASE_URL = 'http://localhost:3003/api'
const INITIAL_VALUES = {mes: mesA, ano: anoA, situacao:'ATIVO',
        creditsNormal: [{status: 'PENDENTE'}], creditsAdic: [{}], creditsPort: [{}]}

export function create(values) {
    return dispatch => {
        axios.post(`${BASE_URL}/investClients`, values)
            .then(resp => {
                toastr.success('Sucesso' ,'Operação Realizada com Sucesso!')
                dispatch([
                    resetForm('clientesForm'),
                    init(),            
                    hashHistory.push('/')
                ])
            })
            .catch(e => {
                e.response.data.errors.forEach(error => toastr.error('Erro', error))
            })
    }
}



export function initCli() {
    return [
        showTabs('tabCreate'),
        selectTab('tabCreate'),
        initialize('clientesForm', INITIAL_VALUES)
    ]
}
