/**
 * What CMS offers a free API which is very suit to our project requirements.
 * Its API only takes a URL/DOMAIN as a parameter
 */
const API_KEY = require('../Magic').API_KEY_WhatCMS;
const axios = require('axios');


// Status code which whatcms supplys in case the domain not found
const DOMAIN_NOT_FOUND = 202;

// The domain already been validated in the middleware :)
async function scanDomain(domain) {
    try {
        const requestFormatted = `https://whatcms.org/API/Tech?key=${API_KEY}&url=${domain}`;

        const response = await axios.get(requestFormatted);

        if (response.data.result.code === DOMAIN_NOT_FOUND) {
            // Domain not found :(
            return [];
        }
        console.log("what cms:\n", response.data.results)
        return response.data.results;
    } catch (err) {
        return [];
    }
}


module.exports = scanDomain;