const prisma = require("../../prisma/prisma")
const { UserModel } = require("../../Schemas/User")

module.exports = async function validateEmail(email) {
    const user = await prisma.user.findUnique({ select: { email }, where: { email: email } })
    return !!user
}