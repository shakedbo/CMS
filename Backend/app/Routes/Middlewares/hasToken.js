const { UserModel } = require('../../Schemas/User');


module.exports = async function (req, res, next) {
    try {
        let accessToken = req.cookies.jwt;
        // If there is no token stored in cookies, the request is unauthorized
        await UserModel.findByToken(accessToken, (err, user) => {
            if (err) {
                throw err;
            }
            if (!user) {
                res.locals.hasToken = false;
                next();
            }
            req.accessToken = accessToken;
            req.user = user;
            res.locals.hasToken = true;
            next();
        })
    } catch (err) {
        res.locals.hasToken = false;
        next();
    }
}