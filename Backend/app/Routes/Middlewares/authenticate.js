// Authenticate the user with its cookies'
const { UserModel } = require('../../Schemas/User');

module.exports = async function (req, res, next) {
    try {
        let accessToken = req.cookies.jwt_access_token;
        let refreshToken = req.cookies.jwt_refresh_token;
        // If there is no token stored in cookies, the request is unauthorized
        await UserModel.findByTokenOrRefresh(accessToken, refreshToken, (err, user, isRefreshed = false) => {
            // Refresh Token expired or something
            if (err !== null) {
                if (err.toString() === 'Refresh token expired') {
                    // We need to refresh the access token
                    res.locals.unauthorized = { Unauthorized: 'Credentials (cookies) expired ...' };
                }
                next();
            }
            else {
                if (!user) {
                    res.locals.hasToken = false;
                    next();
                }
                else {
                    // update the access token cookie
                    res.cookie("jwt_access_token", user.accessToken, { httpOnly: true });
                    req.accessToken = user.accessToken;
                    req.user = user;
                    res.locals.hasToken = true;
                    next();
                }
            }
        })
    } catch (err) {
        res.locals.hasToken = false;
        next();
    }
}