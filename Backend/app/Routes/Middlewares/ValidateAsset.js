/**
 * @validation {Validating the URL/IP format}
 */
const { R_IP, R_DOMAIN } = require("../../../../client/src/Magic/Regex.magic");

module.exports = () => {
    return (req, res, next) => {
        const domain_ip = req.body.url_ip;
        if (typeof domain_ip === 'undefined' || domain_ip === null) {
            return res.status(400).send({ error: "URL/IP must be given !" });
        }
        if (domain_ip[0] >= '0' && domain_ip[0] <= '9') {
            // Must be an IP
            if (domain_ip.match(new RegExp(R_IP)) === false) {
                return res.status(400).send({ error: "Invalid IP ADDRESS" });
            }
            // Passing parameters between middlewares is done through res.locals
            res.locals.ip = domain_ip;
        }
        else {
            // Must be a domain
            if (domain_ip.match(R_DOMAIN) === false) {
                return res.status(400).send({ error: 'Invalid URL' });
            }
            // Passing parameters between middlewares is done through res.locals
            res.locals.domain = domain_ip;
        }
        next();
    }
}