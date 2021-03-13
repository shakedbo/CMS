/**
 * Similar Tech offers a free API which is very suit to our project requirements.
 * Its API only takes a URL/DOMAIN as a parameter
 */

const API_KEY = require('../Magic').API_KEY_SIMILARTECH;
const axios = require('axios');


// The domain already been validated in the middleware :)
async function scanDomain(domain) {
    const requestFormatted = `https://api.similartech.com/v1/site/${domain}/technologies?userkey=${API_KEY}&format=json`;

    const response = await axios.get(requestFormatted);

    if (response.data.found === false) {
        throw "DOMAIN NOT FOUND !";
    }
    console.log("response.data.technologies - \n", response.data.technologies);
    return response.data.technologies;
}


module.exports = scanDomain;