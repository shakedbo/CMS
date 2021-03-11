const express = require('express');


// Importing middlewares
const validateAsset = require('./Middlewares/ValidateAsset');
const validateID = require('./Middlewares/ValidateID');

// Importing controllers
const { scanAsset, deleteScanAsset, getScanAsset } = require('../Controllers/Asset.controller');


module.exports = function routes(app) {
    const router = express.Router();

    /**
     * By a given single URL/IP we supply the systems which are used by the asset
     * Unique ID is returned in the response
     */
    router.post('/scanAsset', validateAsset(), scanAsset);

    router.get('/scanResult:id', validateID(), getScanAsset);

    router.delete('/scanAsset:id', validateID(), deleteScanAsset);


    app.use('/', router);
}