
const { ACCESS_TOKEN, REFRESH_TOKEN } = require('../Config/cookies.config');
const validateEmail = require('../Routes/Middlewares/validateEmail');
const { saveToken, useToken } = require('../Microservices/ValidToken')
const prisma = require("../prisma/prisma")


async function addCustomer(req, res) {

    /*try {
        const customerName = req.body.customerName, email = req.body.email, program = req.body.program;
        const customer = new CustomerModel({ customertName, email, program });
        await customer.save();
        // Secure enforcing that the cookies are sent only over https and not over http
        res.cookie(ACCESS_TOKEN, user.accessToken, { httpOnly: false })
        res.cookie(REFRESH_TOKEN, user.refreshToken, {  httpOnly: true })
        res.status(200).send({ user });
    } catch (error) {
        // If the error is thrown as a result of "username/email is already taken" we sanitize the error to the client side
        if (typeof error.message !== 'undefined') {
            return res.status(400).send({ error: error.message });
        }
        else {
            return res.status(400).send({ error });
        }
    }*/
}

async function deleteCustomer(req, res) {
    /*try {
        if (res.locals.hasToken) {
            await CustomerModel.deleteUserByCustomername(res.locals.customer.customererName);
            res.clearCookie(ACCESS_TOKEN);
            res.clearCookie(REFRESH_TOKEN);
            return res.status(200).send({ success: "Success in deleting user account" })
        }
        else {
            throw "No cookies specified"
        }
    } catch (error) {
        return res.status(400).send({ error });
    }*/
}

async function changeCustomerDetails(req, res) {
    /*try {
        let newUsername = req.body.username, newPassword = req.body.password, newEmail = req.body.email,
            accessToken = req.cookies.jwt_access_token, refresh_token = req.cookies.jwt_refresh_token;
        // newUsername, newPassword, newEmail are already been validated
        const user = await UserModel.changeDetails(newUsername, newPassword, newEmail, accessToken, refresh_token)
        await user.save();
        console.log("[+] New user:\n", user)
        return res.status(200).send({ user })
    } catch (error) {
        return res.status(400).send({ error })
    }*/
}

async function getCustomers(req, res){

}

module.exports = {addCustomer,deleteCustomer,changeCustomerDetails,getCustomers};