import React from 'react'
import MenuItem from './menuItem'


export default props => (
    <ul className='sidebar-menu'>
        <MenuItem path='#/' label='Clientes' icon='address-book' />
        <MenuItem path='#cadastro' label='Cadastro de Clientes' icon='edit' />
    </ul>
)