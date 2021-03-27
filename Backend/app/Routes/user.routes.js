const express = require('express');


const validateUser = require('./Middlewares/validateUser');
const hasToken = require('./Middlewares/hasToken');


const { signup, deleteUser, login/*, refresh*/ } = require('../Controllers/user.controllers')


module.exports = function routes(app) {
    const router = express.Router();

    router.post('/signup', validateUser(), signup);

    // If the token is sent and verified within the request to the route, then
    // we will escape over the validateUser middleWare (which verifies password & username)
    // true specifies NOT_MAIL flag
    router.post('/login', hasToken, validateUser(true), login);

    //    router.post('/refresh', refresh);

    router.delete('/delete-user', deleteUser);


    app.use('/user', router);
}