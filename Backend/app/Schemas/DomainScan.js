const mongoose = require('mongoose');
const { SystemSchema, SystemModel } = require('./System');



const DomainScanSchema = new mongoose.Schema({
    // Asset is the queried domain
    asset: {
        type: String
    },
    // All the results of the queried asset
    systems: {
        type: [SystemSchema],
        default: []
    }
})


const DomainScanModel = mongoose.model('DomainScan', DomainScanSchema);

module.exports = { DomainScanModel, DomainScanSchema };