const express = require('express')

module.exports = function(server) {

    const router = express.Router()
    server.use('/api', router)

    const ClientInvestments = require('../api/investClient/clientInvestService')
    ClientInvestments.register(router, '/investClients')
}