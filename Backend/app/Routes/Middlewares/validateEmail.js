const prisma = require("../../prisma/prisma")

module.exports = async function validateEmail(email) {
    const user = await prisma.user.findUnique({ select: { email }, where: { email: email } })
    return !!user
}
