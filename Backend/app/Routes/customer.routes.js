const express = require('express');

const validateUser = require('./Middlewares/validateUser');
const authenticate = require('./Middlewares/authenticate');
const { validateEmailToken } = require('./Middlewares/validateEmailToken');

const { addCustomer, deleteCustomer, changeCustomerDetails,getCustomers} = require('../Controllers/customer.conrollers');


module.exports = function routes(app) {
    const router = express.Router();

    router.post('/add-customer', authenticate(true), addCustomer);

    router.delete('/delete-customer', authenticate(true), deleteCustomer);

    router.post('/change-customer-details', authenticate(true), changeCustomerDetails);
    
    router.get('/get-customers', authenticate(true), getCustomers);

    app.use('/api/customer', router);

}