const express = require('express');


// Importing middlewares
const validateAsset = require('./Middlewares/ValidateAsset');
const validateID = require('./Middlewares/ValidateID');
const validateAssets = require('./Middlewares/validateAssets');
// Importing controllers
const { scan, scanAsset, deleteScanAsset, getScanAsset } = require('../Controllers/asset.controller');


module.exports = function routes(app) {
    const router = express.Router();

    /**
     * By a given single URL/IP we supply the systems which are used by the asset
     * Unique ID is returned in the response
     */
    router.post('/scanAsset', validateAsset(), scanAsset);

    router.get('/scanResult:id', validateID(), getScanAsset);

    router.delete('/scanAsset:id', validateID(), deleteScanAsset);

    router.post('/scan', validateAssets(), scan)

    app.use('/api/asset', router);
}