import React, { Component } from 'react'

import Row from '../common/layout/row'
import Grid from '../common/layout/grid'
import ValueBox from '../common/widget/valueBox'

export default ({creditNorm, creditAdic, creditPort}) => (

        <fieldset>
            <legend>Resumo</legend>
                <Row>
                <ValueBox cols='12' color='green' icon='bank'
                    value={`R$ ${creditNorm}`} text='Saldo Normal'/>
                </Row>
                <Row>
                <ValueBox cols='12' color='yellow' icon='money'
                    value={`R$ ${creditAdic}`} text='Saldo Adicional'/>
                </Row>
                <Row>    
                <ValueBox cols='12' color='orange' icon='exchange'
                    value={`R$ ${creditPort}`} text='Saldo Portabilidade'/>
                </Row>
                <Row>
                <ValueBox cols='12' color='blue' icon='dollar'
                    value={`R$ ${creditNorm + creditAdic + creditPort}`} text='Saldo Total'/>
                </Row>
        </fieldset>

)