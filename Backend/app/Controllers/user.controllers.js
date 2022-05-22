const { ACCESS_TOKEN, REFRESH_TOKEN } = require('../Config/cookies.config');
const validateEmail = require('../Routes/Middlewares/validateEmail');
const nodemailer = require('nodemailer');
const { saveToken, useToken } = require('../Microservices/ValidToken');
const prisma = require("../prisma/prisma")
const cryptoJS = require("crypto-js");

var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "505480d644e0be",
      pass: "f925ef540e3699"
    }
  });


async function signup(req, res) {
    try {
        const name = req.body.name, password_hash = req.body.password, email = req.body.email;
        const createdUser = await prisma.user.create({
            data: {
                name: name,
                email,
                password_hash,
            }
        })

        // Secure enforcing that the cookies are sent only over https and not over http
        res.cookie(ACCESS_TOKEN, createdUser.accessToken, { /*secure: true,*/ httpOnly: false })
        res.cookie(REFRESH_TOKEN, createdUser.refreshToken, { /*secure: true,*/ httpOnly: true })
        res.status(200).send({ createdUser });
    } catch (error) {
        console.log(error);
        // If the error is thrown as a result of "username/email is already taken" we sanitize the error to the client side
        if (typeof error.message !== 'undefined') {
            return res.status(403).send({ error: error.message });
        }
        else {
            return res.status(402).send({ error });
        }
    }
}
//If the email is exists, a link to reset password will be sent to the user email 
async function forgotPassword(req, res) {
    const email = req.body.email
    const validEmail = await validateEmail(email)

    if (!validEmail) {
        res.sendStatus(423)
        return
    }

    const token = require('crypto').randomBytes(48).toString('hex');
    saveToken(token, email)
    const link = `http://localhost:3000/reset-password?token=${token}&email=${email}`

    var mailOptions = {
        from: 'team5risk@gmail.com',
        to: email,
        subject: 'Forget Password',
        text: link
    };

    try {
        const info = transport.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(400)
    }
    res.sendStatus(200)
    console.log(validEmail, email, token)

}

async function resetPassword(req, res) {
    const { password, email, token } = req.body
    try {
        const user = await prisma.user.update({ data: { password_hash: password }, where: { email } })
        useToken(token, email)
        console.log("[+] New user:\n", user)
        return res.status(200).send({ user })
    } catch (error) {
        console.error(`resetPassword error = ${error}`);
        return res.status(400).send({ error })
    }
}




// After login, we renewing the tokens
async function login(req, res) {
    try {
        // If the token sent within the request so there is no point to login again
        if (res.locals.hasToken) {
            res.status(200).send({ user: req.user });
        }
        else {
            const email = req.body.email, password = req.body.password;
            const user = await prisma.user.findUnique({ where: { email } })
            const hmac = cryptoJS.HmacSHA256(process.env.secret_login_pass, user.salt + password);
            const hashenv = cryptoJS.enc.Base64.stringify(hmac);
            if (hashenv !== user.password_hash) {
                return res.status(401).send({ error: "cannot" });
            }
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
            await prisma.user.delete({ where: { email: res.locals.user.email } })
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


module.exports = { signup, deleteUser, login, logout, forgotPassword, resetPassword };