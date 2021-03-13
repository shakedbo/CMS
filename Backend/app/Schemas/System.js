const mongoose = require('mongoose');




const SystemSchema = new mongoose.Schema({
    name: {
        type: String
    },
    categories: {
        type: [String]
    },
    version: {
        type: String,
        default: "0.0"
    }
})

const SystemModel = mongoose.model('System', SystemSchema);

module.exports = { SystemModel, SystemSchema };



