import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, arrayInsert, arrayRemove } from 'redux-form'
import Grid from '../common/layout/grid'
import Input from '../common/form/input'
import If from '../common/operator/if'

class SaldoList extends Component {

    add(index, item = {}) {
        if(!this.props.readOnly) {
            this.props.arrayInsert('clientesForm', this.props.field, index, item)
        }
    }

    remove(index) {
        if(!this.props.readOnly && this.props.list.length > 1) {
            this.props.arrayRemove('clientesForm', this.props.field, index)
        }
    }

    renderRows() {
        const list = this.props.list || []
        return list.map((item, index) => (
            <tr key={index}>
                <td><Field name={`${this.props.field}[${index}].value`} component={Input} 
                        placeholder='Valor do crédito normal' readOnly={this.props.readOnly}/></td>
                <td><Field name={`${this.props.field}[${index}].mes`} component={Input} 
                        placeholder='Mes vencimento' readOnly={this.props.readOnly}/></td>
                <td><Field name={`${this.props.field}[${index}].ano`} component={Input} 
                        placeholder='Ano vencimento' readOnly={this.props.readOnly}/></td>
                <If teste={this.props.showStatus}>
                <td><Field name={`${this.props.field}[${index}].status`} component={Input} 
                        readOnly={this.props.readOnly} /></td>
                </If>
                <If teste={this.props.showActions}>
                <td>
                    <button type='button' className='btn btn-success'
                        onClick={() => this.add(index + 1)}>
                        <i className='fa fa-plus'></i>
                    </button>
                    <button type='button' className='btn btn-warning'
                        onClick={() => this.add(index + 1, item)}>
                        <i className='fa fa-clone'></i>
                    </button>
                    <button type='button' className='btn btn-danger'
                        onClick={() => this.remove(index)}>
                        <i className='fa fa-minus'></i>
                    </button>
                </td>
                </If>
            </tr>

        ))
    }

    render() {
        return (
            <Grid cols={this.props.cols}>
                <fieldset>
                    <legend>{this.props.legend}</legend>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Valor</th>
                                <th>Mês</th>
                                <th>Ano</th>
                                <If teste={this.props.showStatus}>
                                <th>Status</th>
                                </If>
                                <If teste={this.props.showActions}>
                                <th className='table-actions'>Ação</th>
                                </If>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderRows()}
                        </tbody>
                    </table>
                </fieldset>
            </Grid>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({arrayInsert, arrayRemove}, dispatch)
export default connect(null, mapDispatchToProps)(SaldoList)