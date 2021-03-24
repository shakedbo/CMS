const SimilarTechScanDomain = require('../Microservices/SimilarTech');
const WhatCMSScanDomain = require('../Microservices/WhatCMS');
const WappalyzerScanDomain = require('../Microservices/Wappalyzer');
const RemoveDups = require('../Help-Functions/RemoveDups');
const { BatchOfQueriesModel } = require('../Schemas/BatchOfQueries');


async function scanAsset(req, res) {
    if (typeof res.locals.ip !== 'undefined') {
        res.send({ ahla: res.locals.ip });
    }
    else {
        try {
            let domain = res.locals.domain;
            // Run all the micro-services parallelly with promise all
            const requests2MicroServices = [SimilarTechScanDomain(domain), WhatCMSScanDomain(domain), WappalyzerScanDomain(domain)];

            // Here, allInfoAboutDomain is an array of arrays when each array is suit for each micro service
            const allInfoAboutDomain = await Promise.all(requests2MicroServices);


            const infoWithoutDups = RemoveDups(allInfoAboutDomain);

            console.log("infoWithoutDups = \n", infoWithoutDups);

            // Here, keep the results in the DataBase

            let batchOfScans = await new BatchOfQueriesModel();

            await batchOfScans.addDomainScan(res.locals.domain, infoWithoutDups);

            res.send({ domainInfo: batchOfScans.domainScans });
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