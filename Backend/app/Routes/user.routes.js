const express = require('express');


const validateUser = require('./Middlewares/validateUser');
const authenticate = require('./Middlewares/authenticate');
const noDup = require('./Middlewares/validateNoDup');
const { validateEmailToken } = require('./Middlewares/validateEmailToken');

const { signup, deleteUser, login, logout, changeDetails, forgotPassword, resetPassword } = require('../Controllers/user.controllers');


module.exports = function routes(app) {
    const router = express.Router();

    router.post('/register', validateUser(), signup);

    // If the token is sent and verified within the request to the route, then
    // we will escape over the validateUser middleWare (which verifies password & username)
    router.post('/login', validateUser(true), login);

    router.delete('/delete', authenticate(true), deleteUser);

    // A route to check if the user cookies are authenticated
    router.post('/is-authenticated', authenticate(true), (req, res) => {
        return res.status(200).send({ user: req.user });
    });

    router.post('/logout', logout);

    router.post('/forgot-password', forgotPassword);

    router.post('/validate-change-password', validateEmailToken, (req, res) => res.sendStatus(200));

    router.post('/reset-password', validateEmailToken, resetPassword)
    app.use('/api/user', router);

    app.post('*', (req, res) => res.status(404).send({ notFound: 'Status code 404' }));
    app.get('*', (req, res) => res.status(404).send({ notFound: 'Status code 404' }));
    app.delete('*', (req, res) => res.status(404).send({ notFound: 'Status code 404' }));
    app.patch('*', (req, res) => res.status(404).send({ notFound: 'Status code 404' }));
    app.head('*', (req, res) => res.status(404).send({ notFound: 'Status code 404' }));
}