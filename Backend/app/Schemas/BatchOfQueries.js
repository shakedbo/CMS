/**
 * A single log which is a query that contains all the results,
 * Each log contains array of domains and IPs.
 */


const mongoose = require('mongoose');
const { DomainScanModel, DomainScanSchema } = require('./DomainScan');
const { IPScanModel, IPScanSchema } = require('./IPScan');
const { SystemModel, SystemSchema } = require('./System');


// ToDo: add log date & time
const BatchOfQueriesSchema = new mongoose.Schema({
    scanId: {
        // The ID of the scan result in order to distinguish between scans
        type: String
    },
    domainScans: {
        type: [DomainScanSchema],
        default: []
    },
    ipsScans: {
        type: [IPScanSchema],
        default: []
    }
})


const BatchOfQueriesModel = mongoose.model('BatchOfQueries', BatchOfQueriesSchema);


module.exports = { BatchOfQueriesModel, BatchOfQueriesSchema };