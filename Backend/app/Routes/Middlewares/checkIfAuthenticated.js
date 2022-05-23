
const { REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET } = require('../../Config');
const prisma = require("../../prisma/prisma")
const jwt = require('jsonwebtoken');


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

async function checkIfAuthenticated(req) {
    let accessToken = req.cookies.jwt_access_token;
    let refreshToken = req.cookies.jwt_refresh_token;
    console.log(`acctok=${accessToken} , reftok=${refreshToken}`);
    // If there is no token stored in cookies, the request is unauthorized
    const user = await findByTokenOrRefresh(accessToken, refreshToken);
    return user;
}
exports.checkIfAuthenticated = checkIfAuthenticated;
