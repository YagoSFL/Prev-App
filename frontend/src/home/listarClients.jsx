import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getList, showUpdate, showDelete } from './listaClientesActions'
//const dateformat = require('dateformat')

class ListarClients extends Component {

    componentWillMount() {
        this.props.getList()
    }

    renderRows() {
        const list = this.props.list || []
        return list.map(cl => (
            <tr key={cl._id}>
                <td>{cl.document}</td>
                <td>{cl.nome} {cl.sobrenome}</td>
                <td>{cl.idade}</td>
                <td>{`${cl.mes}/${cl.ano}`}</td>
                <td>{cl.situacao}</td>
                <td>{cl.tipo}</td>
                <td> 
                    <button className='btn btn-warning' onClick={() => this.props.showUpdate(cl)}> 
                        <i className='fa fa-pencil'></i>
                    </button>
                    <button className='btn btn-danger' onClick={() => this.props.showDelete(cl)}> 
                        <i className='fa fa-trash'></i>
                    </button>
                </td>
            </tr>
        ))
    }
    
    render() {
        return (
            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Documento</th>
                            <th>Nome</th>
                            <th>Idade</th>
                            <th>Cliente desde</th>
                            <th>Plano</th>
                            <th>Resgate</th>
                            <th className='table-actions'>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table>    
            </div>
        )
    }
}

const mapStateToProps = state => ({list: state.listaClientes.list})
const mapDispatchToProps = dispatch => bindActionCreators({getList, showUpdate, showDelete}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(ListarClients)