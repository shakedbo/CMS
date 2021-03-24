// true specifies NOT_MAIL flag
module.exports = (flag = false) => {
    return (req, res, next) => {
        let username = req.body.username, password = req.body.password, email = req.body.email;
        if (typeof (username) === 'undefined' || typeof (password) === 'undefined' || (typeof (email) === 'undefined' && flag === false)) {
            return res.status(400).send({ error: flag ? 'Username & password are required fields' : 'Username, password & email are required fields' });
        }
        /**
         * [a-zA-Z0-9_]{5,} to match at least five alphanumerics and the underscore
         * [a-zA-Z]+ to have at least one letter
         * [0-9]* to match zero to any occurrence of the given numbers range
         */
        if (!username.match(/^[a-zA-Z0-9_]{5,}[a-zA-Z]+[0-9]*$/)) {
            return res.status(400).send({ error: 'Invalid username' });
        }
        if (password.length < 6 || password.length > 12) {
            return res.status(400).send({ error: 'Invalid password' });
        }
        if (flag === false && !email.match(/\S+@\S+\.\S+/)) {
            return res.status(400).send({ error: 'Invalid email' });
        }
        next();
    }
}