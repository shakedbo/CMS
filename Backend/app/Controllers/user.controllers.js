const { UserModel } = require('../Schemas/User');


async function signup(req, res) {
    try {
        const username = req.body.username, password_hash = req.body.password, email = req.body.email;
        const user = new UserModel({ username, email, password_hash });
        await user.save();
        // Secure enforcing that the cookies are sent only over https and not over http
        res.cookie("jwt_access_token", user.accessToken, { /*secure: true,*/ httpOnly: true })
        res.cookie("jwt_refresh_token", user.refreshToken, { /*secure: true,*/ httpOnly: true })
        res.status(200).send({ user });
    } catch (err) {
        return res.status(400).send({ SignUpError: `Something went wrong ...\n ${err}` });
    }
}

// After login, we renewing the tokens
async function login(req, res) {
    try {
        // If the token sent within the request so there is no point to login again
        if (res.locals.hasToken === true) {
            res.status(200).send({ loginSuccess: req.user });
        }
        else {
            const username = req.body.username, password = req.body.password;
            const user = await UserModel.login(username, password);
            res.header('Content-Type', 'application/json;charset=UTF-8')
            res.header('Access-Control-Allow-Credentials', true)
            res.header(
                'Access-Control-Allow-Headers',
                'Origin, X-Requested-With, Content-Type, Accept'
            )
            // Returning the new token to the user after its login
            // secure - Only over https
            // httpOnly - cannot access the cookie via the DOM (a CSRF mitigation)
            res.cookie("jwt_access_token", user.accessToken, { /*secure: true,*/ httpOnly: true });
            res.cookie("jwt_refresh_token", user.refreshToken, { /*secure: true,*/ httpOnly: true });
            res.status(200).send({ loginSuccess: "Success in login with username & password :)" });
            //console.log("[+++] res._headers = ", res._headers.get('set-cookie'));
        }
    } catch (err) {
        return res.status(400).send({ error: err });
    }
}


async function deleteUser(req, res) {
    try {
        const username = req.body.username, password = req.body.password;
        const deleted = await UserModel.deleteUser(username, password);
        return res.send({ User_deleted_successfully: deleted })
    } catch (err) {
        return res.status(400).send({ error: `Something went wrong ...\n ${err}` });
    }
}


module.exports = { signup, deleteUser, login };