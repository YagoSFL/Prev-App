import '../common/template/dependencies'
import React from 'react'

import Header from '../common/template/header'
import Sidebar from '../common/template/sidebar'
import Footer from '../common/template/footer'
import Messages from '../common/msg/msgs'
import Routes from './routes'

export default props => (
        <div className='wrapper'>
            <Header />
            <Sidebar />
            <div className='content-wrapper'>
                <Routes />
            </div>
            <Footer />
            <Messages />
          
        </div>
)