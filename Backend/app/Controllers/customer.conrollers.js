
const { ACCESS_TOKEN, REFRESH_TOKEN } = require('../Config/cookies.config');
const validateEmail = require('../Routes/Middlewares/validateEmail');
const { saveToken, useToken } = require('../Microservices/ValidToken')
const prisma = require("../prisma/prisma")

async function addCustomer(req, res) {
    try {
        const customer = req.body
        prisma.customer.create({
            data: customer
        })
        res.status(200).send({ customer });
    } catch (err) {
        // If the error is thrown as a result of "username/email is already taken" we sanitize the error to the client side
        if (typeof error.message !== 'undefined') {
            return res.status(401).send({ error: error.message });
        }
        else {
            return res.status(400).send({ error });
        }
    }
}

async function deleteCustomer(req, res) {

    try {
        prisma.customer.delete({
            where: {
                email: res.locals.customer.email
            }
        })
    } catch (err) {
        return res.status(400).send({ error });
    }
}

async function changeCustomerDetails(req, res) {
    try {
        const email = req.body.email
        prisma.customer.update({
            where: {
                email: email
            },
            data: {
                program: req.body.program,
                name: req.body.name
            }
        })
    } catch (error) {
        return res.status(400).send({ error })
    }
}

async function getCustomers(req, res) {
    const customers = prisma.customer.findMany()
    res.status(200).send({ customers });
}

module.exports = { addCustomer, deleteCustomer, changeCustomerDetails, getCustomers };