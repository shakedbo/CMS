const express = require('express');


const { addCustomer, deleteCustomer, changeCustomerDetails} = require('../Controllers/customer.controllers');


module.exports = function routes(app) {
    const router = express.Router();

    router.post('/add-customer', authenticate(true), addCustomer);

    router.delete('/delete-customer', authenticate(true), deleteUser);

    router.post('/change-customer-details', authenticate(true), changeCustomerDetails);
    
    router.get('/get-customers', authenticate(true), getCustomers);

    app.use('/api/customer', router);

}