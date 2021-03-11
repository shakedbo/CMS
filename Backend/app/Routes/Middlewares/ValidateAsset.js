/**
 * @validation {Validating the URL/IP format}
 */
module.exports = () => {
    return (req, res, next) => {
        const domain_ip = req.body.url_ip;
        if (typeof domain_ip === 'undefined' || domain_ip === null) {
            return res.status(404).send({ error: "URL/IP must be given !" });
        }
        let isValid = false;
        if (domain_ip[0] >= '0' && domain_ip[0] <= '9') {
            // Must be an IP
            isValid = domain_ip.match(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/g);
            if (isValid === null) {
                return res.status(400).send({ error: "Invalid IP ADDRESS" });
            }
            // Passing parameters between middlewares is done through res.locals
            res.locals.ip = domain_ip;
        }
        else {
            // Must be a domain
            isValid = domain_ip.match(/^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/g);
            if (isValid === null) {
                return res.status(400).send({ error: 'Invalid URL' });
            }
            // Passing parameters between middlewares is done through res.locals
            res.locals.domain = domain_ip;
        }
        next();
    }
}