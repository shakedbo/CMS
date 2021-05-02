const SimilarTechScanDomain = require('../Microservices/SimilarTech');
const WhatCMSScanDomain = require('../Microservices/WhatCMS');
const WappalyzerScanDomain = require('../Microservices/Wappalyzer');
const RemoveDups = require('../Help-Functions/RemoveDups');
const { BatchOfQueriesModel } = require('../Schemas/BatchOfQueries');
const { R_IP } = require("../../../client/src/Magic/Regex.magic");


async function scan(req, res) {
    try {
        let domains_ips = req.body.domainOrIps;
        let username = res.locals.user.username;
        // user.username
        let batchOfScans = new BatchOfQueriesModel({ username });
        const promises = domains_ips.map(domain_ip => {
            if (domain_ip.toString().match(R_IP)) {
                // do ip scan ....
            }
            else {
                // do domain scan ...
                return scanDomain(batchOfScans, domain_ip.toString());
            }
        });

        await Promise.all(promises)
        return res.status(200).send({ results: batchOfScans })
    } catch (err) {
        console.log("error = ", err)
        return res.status(400).send({ error: err })
    }
}

async function scanDomain(batchOfScans, domain) {
    try {
        // Saving time in case the domain was scaned before
        let domain2Add = await BatchOfQueriesModel.isExisted(domain);
        // if not existed before in the DataBase
        if (!domain2Add) {
            // Run all the micro-services parallelly with promise all
            const requests2MicroServices = [SimilarTechScanDomain(domain), WhatCMSScanDomain(domain), WappalyzerScanDomain(domain)];
            // Here, allInfoAboutDomain is an array of arrays when each array is suit for each micro service
            const allInfoAboutDomain = await Promise.all(requests2MicroServices);
            // Removing duplicates
            domain2Add = RemoveDups(allInfoAboutDomain);
        }
        // Here, keep the results in the DataBase
        await batchOfScans.addDomainScan(domain, domain2Add);

        return batchOfScans.domainScans;
    } catch (err) {
        return [];
    }
}


async function getAllUserScans(req, res) {
    try {
        const username = req.user.username;
        const userBatchs = await BatchOfQueriesModel.find({ username });
        let scans = [];
        for (let batch of userBatchs) {
            scans = scans.concat(batch.domainScans);
            scans = scans.concat(batch.ipsScans);
        }
        return res.status(200).send({ scans })
    } catch (err) {
        return res.status(400).send({ error: err })
    }
}

async function recapAboutUserScans(req, res) {
    try {
        const username = req.user.username;
        const totalScans = (await BatchOfQueriesModel.find({ username })).length;

        return res.status(200).send({ results: { totalScans } })
    } catch (error) {
        return res.status(400).send({ error })
    }
}





module.exports = { scan, recapAboutUserScans, getAllUserScans };