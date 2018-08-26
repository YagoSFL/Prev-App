const restful = require('node-restful')
const mongoose = restful.mongoose

const pagamento = new mongoose.Schema({
    value: { type: Number, min: 0, required: [true, 'O valor da primeira mensalidade deve ser preenchido!']},
    mes: { type: Number, min:1, max:12,  required: [true, 'Informe o mes de pagamento!']},
    ano: { type: Number, min: 1970, max: 2100, required: [true, 'Informe o ano de pagamento!']},
    status : { type: String, required: true, uppercase: true,
                enum: ['PAGO', 'PENDENTE', 'VENCIDO'] }
})

const creditAdic = new mongoose.Schema({
    value: { type: Number, min: 0, required: false, default: 0 },
    mes: { type: Number, min:1, max:12,  required: false},
    ano: { type: Number, min: 1970, max: 2100, required: false},
})

const creditPortabilidade = new mongoose.Schema({
    value: { type: Number, min: 0, required: false, default: 0 },
    mes: { type: Number, min:1, max:12,  required: false},
    ano: { type: Number, min: 1970, max: 2100, required: false}
})


const clientSchema = new mongoose.Schema({
    document: { type: String, required: [true, 'Informe o n° do documento do cliente'], unique: true },
    nome: { type: String, required: [true, 'Informe o nome do cliente'] },
    sobrenome: { type: String, required: false },
    idade: { type:Number, min: 18, required: false },
    mes: { type: Number, min:1, max:12,  required: false},
    ano: { type: Number, min: 1970, max: 2100, required: false},
    situacao: { type: String, required: true, uppercase: true, 
                    enum: ['ATIVO', 'VINCULADO', 'SUSPENSO', 'BENEFICIO', 'CANCELADO'] },
    creditsNormal: [pagamento],
    creditsAdic: [creditAdic],
    creditsPort: [creditPortabilidade],
    valueResgate: { type: Number, min: 0, required: false, default: 0 },
    numParcelas: { type: Number, min: 1, max: 60, required: false},
    tipo: { type: String, required: false, uppercase: true,
                enum: ['TOTAL', 'PARCIAL', 'SEM RESGATE']}
   

})

module.exports = restful.model('ClientInvestment', clientSchema)