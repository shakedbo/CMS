const { UserModel } = require('../Schemas/User');
const { ACCESS_TOKEN, REFRESH_TOKEN } = require('../Config/cookies.config');
const validateEmail = require('../Routes/Middlewares/validateEmail');

async function signup(req, res) {
    try {
        const username = req.body.username, password_hash = req.body.password, email = req.body.email;
        const user = new UserModel({ username, email, password_hash });
        await user.save();
        // Secure enforcing that the cookies are sent only over https and not over http
        res.cookie(ACCESS_TOKEN, user.accessToken, { /*secure: true,*/ httpOnly: false })
        res.cookie(REFRESH_TOKEN, user.refreshToken, { /*secure: true,*/ httpOnly: true })
        res.status(200).send({ user });
    } catch (error) {
        // If the error is thrown as a result of "username/email is already taken" we sanitize the error to the client side
        if (typeof error.message !== 'undefined') {
            return res.status(400).send({ error: error.message });
        }
        else {
            return res.status(400).send({ error });
        }
    }
}

async function forgotPassword(req, res) {
    const email = req.body.email
    const validEmail = await validateEmail(email)
    const link = "http://localhost:3000/l"
    console.log(validEmail, email)
    
    
}


// After login, we renewing the tokens
async function login(req, res) {
    try {
        // If the token sent within the request so there is no point to login again
        if (res.locals.hasToken) {
            res.status(200).send({ user: req.user });
        }
        else {
            const username = req.body.username, password = req.body.password;
            const user = await UserModel.login(username, password);
            // Returning the new token to the user after its login
            // secure - Only over https
            // httpOnly - cannot access the cookie via the DOM (a CSRF mitigation)
            res.cookie(ACCESS_TOKEN, user.accessToken, { httpOnly: false });
            res.cookie(REFRESH_TOKEN, user.refreshToken, { /*secure: true,*/ httpOnly: true });
            res.status(200).send({ user });
        }
    } catch (error) {
        return res.status(400).send({ error });
    }
}


async function deleteUser(req, res) {
    try {
        if (res.locals.hasToken) {
            await UserModel.deleteUserByUsername(res.locals.user.username);
            res.clearCookie(ACCESS_TOKEN);
            res.clearCookie(REFRESH_TOKEN);
            return res.status(200).send({ success: "Success in deleting user account" })
        }
        else {
            throw "No cookies specified"
        }
    } catch (error) {
        return res.status(400).send({ error });
    }
}

async function logout(req, res) {
    try {
        // Clear the cookies before log out
        res.clearCookie(ACCESS_TOKEN);
        res.clearCookie(REFRESH_TOKEN);
        return res.status(200).send({ message: "Cookies were deleted in success" });
    } catch (error) {
        return res.status(400).send({ error })
    }
}

async function changeDetails(req, res) {
    try {
        let newUsername = req.body.username, newPassword = req.body.password, newEmail = req.body.email,
            accessToken = req.cookies.jwt_access_token, refresh_token = req.cookies.jwt_refresh_token;
        // newUsername, newPassword, newEmail are already been validated
        const user = await UserModel.changeDetails(newUsername, newPassword, newEmail, accessToken, refresh_token)
        await user.save();
        console.log("[+] New user:\n", user)
        return res.status(200).send({ user })
    } catch (error) {
        return res.status(400).send({ error })
    }
}

module.exports = { signup, deleteUser, login, logout, changeDetails, forgotPassword };