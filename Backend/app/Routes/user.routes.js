const express = require('express');


const validateUser = require('./Middlewares/validateUser');

const { createUser, getUser, deleteUser } = require('../Controllers/user.controllers')


module.exports = function routes(app) {
    const router = express.Router();

    router.post('/create-user', validateUser(), createUser);

    router.get('/get-user', validateUser(), getUser);

    router.delete('/delete-user', deleteUser);


    app.use('/user', router);
}