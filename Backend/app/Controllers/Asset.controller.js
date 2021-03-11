const axios = require('axios');


async function scanAsset(req, res) {
    if (typeof res.locals.ip !== 'undefined') {
        res.send({ ahla: 'ahla' });
    }
    else {
        res.send({ bla: 'bla' });
    }
}

async function getScanAsset(req, res) {

}

async function deleteScanAsset(req, res) {

}






module.exports = { scanAsset, getScanAsset, deleteScanAsset };