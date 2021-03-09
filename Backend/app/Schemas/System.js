const mongoose = require('mongoose');




const SystemSchema = new mongoose.Schema({
    systemName: {
        type: String
    },
    category: {
        type: String
    },
    version: {
        type: Number,
        default: 0.0
    }
})

const SystemModel = mongoose.model('System', SystemSchema);

module.exports = { SystemModel, SystemSchema };



