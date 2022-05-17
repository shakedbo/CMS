const { PrismaClient } = require('@prisma/client')
const crypto = require("crypto");
const cryptoJS = require("crypto-js");
const prisma = new PrismaClient()

prisma.$use(async (params, next) => {
    if (!((params.action == 'create' || params.action === "update") && params.model == 'User')) {
        return next(params);
    }
    if (!params.data.password_hash) {
        return next(params);
    }
    const user = params.args.data;
    user.salt = crypto.randomBytes(16).toString('hex');
    hmac = cryptoJS.HmacSHA256(process.env.secret_login_pass, user.salt + user.password_hash);
    user.password_hash = CryptoJS.enc.Base64.stringify(hmac);
    user.refreshToken = createToken({ username: this.username, email: this.email }, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_LIFE);
    user.accessToken = createToken({ username: this.username, email: this.email }, ACCESS_TOKEN_SECRET, ACCESS_TOKEN_LIFE);
    params.args.data = user;


    return next(params);
});

function createToken(payload, secret, expiresIn) {
    return jwt.sign(payload, secret, {
        algorithm: "HS256",
        expiresIn
    })
}


module.exports = prisma