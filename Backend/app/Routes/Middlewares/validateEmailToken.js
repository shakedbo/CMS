const { validToken } = require('../../Microservices/ValidToken')
function validateEmailToken(request, response, next) {
    const email = request.body.email
    const token = request.body.token
    const tokenIsValid = validToken(token, email)
    if (!tokenIsValid) {
        console.log(`not valid token and email`);
        response.sendStatus(400)
        return
    }
    next()
    // response.sendStatus(200)
}

module.exports = { validateEmailToken }