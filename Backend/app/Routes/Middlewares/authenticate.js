// Authenticate the user with its cookies'
const { ACCESS_TOKEN } = require('../../Config/cookies.config');
const { TOKEN_EXPIRED } = require('../../../../client/src/Magic/Errors.magic');

const { checkIfAuthenticated } = require("./checkIfAuthenticated");
// flag is used to distinguish between a request with cookies or without em
module.exports = () => {
    return async (req, res, next) => {
        try {
            const user = await checkIfAuthenticated(req);
            // Refresh Token expired or something
            console.log(`user=${user}`)
            if (!user) {
                console.log("1) Here")
                res.locals.unauthorized = { Unauthorized: TOKEN_EXPIRED };
                return res.status(401).send({ error: TOKEN_EXPIRED })
            }
            else {
                console.log(`user  = ${!user}`)
                // update the access token cookie
                res.cookie(ACCESS_TOKEN, user.accessToken);
                req.accessToken = user.accessToken;
                req.user = user;
                res.locals.user = user;
                res.locals.hasToken = true;
                next();
            }

        } catch (err) {
            console.log(`err=${err}`)
            return res.status(402).send({ error: "You are not authenticated :(" })
        }
    }
}

