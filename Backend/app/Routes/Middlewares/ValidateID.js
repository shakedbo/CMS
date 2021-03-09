module.exports = function validateId() {
    return (req, res, next) => {
        if (!(req.params.id.length >= 22 && req.params.id.length <= 26)) {
            return res.status(400).send({ error: 'Invalid ID' })
        }
        next()
    }
}