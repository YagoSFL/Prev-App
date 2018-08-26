const ClientInvestment = require('./clientInvest')
const errorHandler = require('../common/errorHandler')

ClientInvestment.methods(['get', 'post', 'put', 'delete'])
ClientInvestment.updateOptions({new: true, runValidators: true})
ClientInvestment.after('post', errorHandler).after('put', errorHandler)
ClientInvestment.route('count', (req, res, next) => {
    ClientInvestment.count((error, value) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json({value})
        }
    })
})

module.exports = ClientInvestment

