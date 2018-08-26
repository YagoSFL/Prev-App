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
import Form from './clientesForm'
import { create, initCli } from './cadastraClientesActions'


class CadastroClientes extends Component {


    componentWillMount() {
        this.props.initCli()
    }

    render() {
        return (
            <div>
                <ContentHeader title='Cadastrar' small='Clientes' />
                <Content>
                    <Tabs>
                        <TabsHeader>
                            <TabHeader label='Dados Cadastrais' icon='vcard' target='tabCreate' />
                        </TabsHeader>
                        <TabsContent>
                            <TabContent id='tabCreate'>
                                <Form onSubmit={this.props.create}
                                    submitLabel='Incluir' submitClass='primary' cancelLabel='Limpar'/>
                            </TabContent>
                        </TabsContent>
                    </Tabs>
                </Content>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ create, initCli}, dispatch)
export default connect(null, mapDispatchToProps)(CadastroClientes)