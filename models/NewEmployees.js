const mongoose = require('mongoose')

const newEmployeeSchema = new mongoose.Schema({
    firstname: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Employee', newEmployeeSchema)