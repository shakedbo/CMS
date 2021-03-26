const express = require('express');


const validateUser = require('./Middlewares/validateUser');

const { signup, deleteUser, login/*, refresh*/ } = require('../Controllers/user.controllers')


module.exports = function routes(app) {
    const router = express.Router();

    router.post('/signup', validateUser(), signup);

    // true specifies NOT_MAIL flag
    router.post('/login', validateUser(true), login);

    //    router.post('/refresh', refresh);

    router.delete('/delete-user', deleteUser);


    app.use('/user', router);
}