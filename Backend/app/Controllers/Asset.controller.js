const axios = require('axios');

const scanDomain = require('../Microservices/SimilarTech');
const { BatchOfQueriesModel } = require('../Schemas/BatchOfQueries');



async function scanAsset(req, res) {
    if (typeof res.locals.ip !== 'undefined') {
        res.send({ ahla: res.locals.ip });
    }
    else {
        try {
            const domainInfo = await scanDomain(res.locals.domain);
            // Here, keep the results in the DataBase
            let batchOfScans = await new BatchOfQueriesModel();

            await batchOfScans.addDomainScan(res.locals.domain, domainInfo);
            res.send(domainInfo);
        } catch (err) {
            res.status(404).send({ error: err });
        }
    }
}

async function getScanAsset(req, res) {

}

async function deleteScanAsset(req, res) {

}






module.exports = { scanAsset, getScanAsset, deleteScanAsset };