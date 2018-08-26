import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'

import { init } from '../home/listaClientesActions'
import LabelSelect from '../common/form/labelAndSelect'
import LabelInput from '../common/form/labelAndInput'
import SaldoList  from '../home/saldoList'
import Resumo from '../home/resumo'
import Grid from '../common/layout/grid'

class FormClientes extends Component {

    
    calculateResumo() {
        const sum = (t, v) => t + v
        return {
            sumOfCredNorm: this.props.creditsNormal.map((cA) => {
                if(cA.status == 'PAGO'){
                    return +cA.value
                } else {
                    return 0
                }
            }).reduce(sum),
            sumOfCredAdic: this.props.creditsAdic.map(cA => +cA.value || 0).reduce(sum),
            sumOfCredPort: this.props.creditsPort.map(cP => +cP.value || 0).reduce(sum),
        }
    }

    checaStatusResgate(){
        if(this.props.tipoResgate == "PARCIAL") {
            return true
        } else {
            return false
        }
    }

    desabilitaCampos(){
        if(this.props.tipoResgate == "PARCIAL" || this.props.tipoResgate == "TOTAL") {
            return true
        } else {
            return false
        }
    }

    renderResgatForm() {
        const dateformat = require('dateformat')
        let curDate = new Date()
        let mesA = dateformat(curDate, "mm")
        let anoA = dateformat(curDate, "yyyy")

        if(anoA >= this.props.ano + 3 && this.props.mes >= mesA && 
            this.props.situacao == 'CANCELADO' ) {
            return  true
        } else {
            return false
        }        
    }

    render() {
        const { handleSubmit, readOnly, disabled, creditsNormal, creditsAdic, 
                creditsPort, mes, ano, situacao, tipoResgate } = this.props
        const { sumOfCredNorm, sumOfCredAdic, sumOfCredPort } = this.calculateResumo()
        return (
            <form role='form' onSubmit={handleSubmit}>
                <div className='box-body'>
                    <Field name='document' component={LabelInput} 
                        label='Documento' cols='12 4' placeholder='Doc do cliente' readOnly={readOnly}/>   
                    <Field name='nome' component={LabelInput} 
                        label='Nome' cols='12 4' placeholder='Nome do cliente' readOnly={readOnly}/>
                    <Field name='sobrenome' component={LabelInput} 
                        label='Sobrenome' cols='12 4' placeholder='Sobrenome do cliente' readOnly={readOnly}/>
                    <Field name='idade' component={LabelInput} 
                        label='Idade' cols='12 4' readOnly={readOnly}/>
                    <Field name='mes' component={LabelInput} disabled={disabled} cols='2' 
                        readOnly={readOnly} label='Mês'/>
                    <Field name='ano' component={LabelInput} disabled={disabled} cols='2' 
                        readOnly={readOnly} label=' Ano'/>
                    <Field name='situacao' component={LabelSelect} readOnly={readOnly} label='Situação' cols='4'>
                        <option defaultValue>SITUACAO DO PLANO</option>
                        <option value='ATIVO'>ATIVO</option>
                        <option value='SUSPENSO'>SUSPENSO</option>
                        <option value='VINCULADO'>VINCULADO</option>
                        <option value='BENEFICIO'>BENEFICIO</option>
                        <option value='CANCELADO'>CANCELADO</option>
                    </Field>
                    <Grid cols='4'>
                        <Resumo  creditNorm={sumOfCredNorm} creditAdic={sumOfCredAdic} creditPort={sumOfCredPort} />
                    </Grid>
                    {this.desabilitaCampos() ? <div></div>

                        : <div><SaldoList cols='8' list={creditsNormal} addValue={readOnly} showActions={true}
                    field='creditsNormal' legend='Contribuições Normais' showStatus={true}/>
                <SaldoList cols='8' list={creditsAdic} addValue={readOnly} showActions={true}
                    field='creditsAdic' legend='Contribuições Adicionais' showStatus={false}/>
                <SaldoList cols='8' list={creditsPort} addValue={readOnly} showActions={false}
                    field='creditsPort' legend='Crédito Portabilidade' showStatus={false}/>
                    </div> }
                        {this.renderResgatForm() && <div>
                            <Grid cols='8'>
                            <legend>Resgate de Saldo</legend>
                                <Field name='tipo' component={LabelSelect} readOnly={readOnly} 
                                    label='Modo do resgate' cols='4'>
                                    <option defaultValue>SITUACAO DO PLANO</option>
                                    <option value='PARCIAL'>PARCIAL</option>
                                    <option value='SEM RESGATE'>SEM RESGATE</option>
                                    <option value='TOTAL'>TOTAL</option>
                                </Field>
                                {this.checaStatusResgate()&&
                                <Field name='valueResgate' component={LabelInput}  cols='4' 
                                    readOnly={readOnly} label='Valor' />}
                                <Field name='numParcelas' component={LabelInput} cols='4' 
                                    readOnly={readOnly} label='N° de Parcelas'/>
                            </Grid>
                            </div>
                        }
                    
                </div>
                <div className='box-footer'>
                    <button type='submit' className={`btn btn-${this.props.submitClass}`}>
                        {this.props.submitLabel}
                    </button>
                    <button type='button' className='btn btn-default'
                        onClick={this.props.init}>{this.props.cancelLabel}</button>
                </div>
            </form>
        )
    }
}

FormClientes = reduxForm({form: 'clientesForm', destroyOnUnmount: false})(FormClientes)
const selector = formValueSelector('clientesForm')

const mapStateToProps = state => ({
    creditsNormal: selector(state, 'creditsNormal'),
    creditsAdic: selector(state, 'creditsAdic'),
    creditsPort: selector(state, 'creditsPort'),
    mes: selector(state, 'mes'),
    ano: selector(state, 'ano'),
    situacao: selector(state, 'situacao'),
    tipoResgate: selector(state, 'tipo')

})
const mapDispatchToProps = dispatch => bindActionCreators({init}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(FormClientes)