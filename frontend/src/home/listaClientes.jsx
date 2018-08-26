import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ContentHeader from '../common/template/contentHeader'
import Content from '../common/template/content'
import Tabs from '../common/tab/tabs'
import TabsHeader from '../common/tab/tabsHeader'
import TabsContent from '../common/tab/tabsContent'
import TabHeader from '../common/tab/tabHeader'
import TabContent from '../common/tab/tabContent'
import { update, exclude, init } from './listaClientesActions'
import Lista from './listarClients'
import Form from '../cadastro/clientesForm'


class ListaClientes extends Component {

    componentWillMount() {
        this.props.init()
    }

    render() {
        return (
            <div>
                <ContentHeader title='Gerenciar' small='Clientes' />
                <Content>
                    <Tabs>
                        <TabsHeader>
                            <TabHeader label='Lista' icon='bars' target='tabList' />
                            <TabHeader label='Resumo' icon='vcard-o' target='tabView' />
                            <TabHeader label='Editar' icon='pencil' target='tabEdit' />
                            <TabHeader label='Excluir' icon='trash-o' target='tabDelete' />
                        </TabsHeader>
                        <TabsContent>
                            <TabContent id='tabList'>
                                <Lista />
                            </TabContent>
                            <TabContent id='tabEdit'>
                                <Form onSubmit={this.props.update} submitLabel='Alterar'
                                    submitClass='warning' cancelLabel='Cancelar' disabled={true}/>
                            </TabContent>
                            <TabContent id='tabDelete'>
                                <Form readOnly={true} onSubmit={this.props.exclude} 
                                    submitLabel='Excluir' submitClass='danger' cancelLabel='Cancelar'/>
                            </TabContent>
                        </TabsContent>
                    </Tabs>
                </Content>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({update, exclude, init}, dispatch)
export default connect(null, mapDispatchToProps)(ListaClientes)