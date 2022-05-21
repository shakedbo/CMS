const { PrismaClient } = require('@prisma/client')
const crypto = require("crypto");
const cryptoJS = require("crypto-js");
const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_LIFE, REFRESH_TOKEN_LIFE, REFRESH_TOKEN_SECRET } = require('../Config');
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken');

prisma.$use(async (params, next) => {
    if (!((params.action == 'create' || params.action === "update") && params.model == 'User')) {
        return next(params);
    }
    const user = params.args.data;
    if (!user.password_hash) {
        return next(params);
    }
    user.salt = crypto.randomBytes(16).toString('hex');
    hmac = cryptoJS.HmacSHA256(process.env.secret_login_pass, user.salt + user.password_hash);
    user.password_hash = cryptoJS.enc.Base64.stringify(hmac);
    user.refreshToken = createToken({ name: user.name, email: user.email }, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_LIFE);
    user.accessToken = createToken({ name: user.name, email: user.email }, ACCESS_TOKEN_SECRET, ACCESS_TOKEN_LIFE);
    params.args.data = user;


    return next(params);
});

function createToken(payload, secret, expiresIn) {
    return jwt.sign(payload, secret, {
        algorithm: "HS256",
        expiresIn
    })
}
prisma.createToken = createToken

module.exports = prisma