const express = require('express');


// Importing middlewares
const validateID = require('./Middlewares/ValidateID');
const validateAssets = require('./Middlewares/validateAssets');
const authenticate = require('./Middlewares/authenticate');

// Importing controllers
const { scan, deleteScanAsset, getScanAsset, getAllUserScans } = require('../Controllers/asset.controller');


module.exports = function routes(app) {
    const router = express.Router();

    /**
     * By a given single URL/IP we supply the systems which are used by the asset
     * Unique ID is returned in the response
     */
    // router.get('/scanResult:id', validateID(), getScanAsset);

    // router.delete('/scanAsset:id', validateID(), deleteScanAsset);

    router.post('/scan', validateAssets(), authenticate(), scan)

    router.get('/get-all-user-scans', authenticate(), getAllUserScans);

    app.use('/api/asset', router);
}