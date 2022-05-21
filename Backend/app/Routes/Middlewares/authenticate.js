// Authenticate the user with its cookies'
const { ACCESS_TOKEN, REFRESH_TOKEN } = require('../../Config/cookies.config');
const jwt = require('jsonwebtoken');
const { TOKEN_EXPIRED } = require('../../../../client/src/Magic/Errors.magic');
const prisma = require("../../prisma/prisma")
const { REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET } = require('../../Config');
// flag is used to distinguish between a request with cookies or without em
module.exports = () => {
    return async (req, res, next) => {
        try {
            let accessToken = req.cookies.jwt_access_token;
            let refreshToken = req.cookies.jwt_refresh_token;
            // If there is no token stored in cookies, the request is unauthorized

            const user = await findByTokenOrRefresh(accessToken, refreshToken)
            // Refresh Token expired or something
            console.log(`user=${user}`)
            if (!user) {
                console.log("1) Here")
                res.locals.unauthorized = { Unauthorized: TOKEN_EXPIRED };
                return res.status(401).send({ error: TOKEN_EXPIRED })
            }
            else {
                if (!user) {
                    console.log(`!user ${!user}`)
                    res.locals.hasToken = false;
                    next();
                }
                else {
                    console.log(`!user  = ${!user}`)
                    // update the access token cookie
                    res.cookie(ACCESS_TOKEN, user.accessToken);
                    req.accessToken = user.accessToken;
                    req.user = user;
                    res.locals.user = user;
                    res.locals.hasToken = true;
                    next();
                }
            }

        } catch (err) {
            console.log(`err=${err}`)
            return res.status(402).send({ error: "You are not authenticated :(" })
        }
    }
}



async function findByTokenOrRefresh(accessToken, refreshToken) {
    if (!accessToken || typeof (accessToken) === 'undefined') {
        throw "No access token specified :(";
    }
    try {
        const decode = jwt.verify(accessToken, ACCESS_TOKEN_SECRET)
        console.log(`decode=${decode}`)
        const user = await prisma.user.findFirst({ where: { email: decode.email, accessToken: accessToken } })
        console.log(`here12345`);
        return user
    } catch (err) {
        console.log(`err1=${err}`)
        if (err && err.toString().includes('TokenExpiredError: jwt expired')) {
            // We need to refresh the access token
            console.log(`going to refresh accesstoken`);
            const user = await refreshAccessToken(accessToken, refreshToken)
            console.log(`user=${user}`);
            return user
        }
    }
}

const refreshAccessToken = async function (accessToken, refreshToken) {
    if (!accessToken || typeof (accessToken) == 'undefined' || !refreshToken || typeof (refreshToken) === 'undefined') {
        throw "No Access/Refresh tokens specified"
    }

    try {
        const decode = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET)
    }
    catch (err) {
        console.error(`er1223r=${err}`);
        if (err.toString().includes('TokenExpiredError: jwt expired')) {
            throw err
        }
        else {
            try {
                let user = await prisma.user.findUnique({ where: refreshToken })
                accessToken = prisma.createToken({ name: user.name, email: user.email }, ACCESS_TOKEN_SECRET, 10)
                console.log(`accessToken=${accessToken}`);
                user = await prisma.user.update({ where: { id: user.id }, data: { accessToken } })
                return user
            }
            catch (err) {
                throw err
            }
        }
    }       
}