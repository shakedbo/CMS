/*const Wappalyzer = require('wappalyzer');

const urls = ['https://www.wappalyzer.com', 'https://www.example.com']

const wappalyzer = new Wappalyzer()

    ; (async function () {
        try {
            await wappalyzer.init()

            const results = await Promise.all(
                urls.map(async (url) => ({
                    url,
                    results: await wappalyzer.open(url).analyze()
                }))
            )

            console.log(JSON.stringify(results, null, 2))
        } catch (error) {
            console.error(error)
        }

        await wappalyzer.destroy()
})()*/


const Wappalyzer = require('wappalyzer');


const wappalyzer = new Wappalyzer()



async function scanDomain(domain_ip) {
    try {
        let domain_ip_formatted = 'https://' + domain_ip
        await wappalyzer.init()

        const results = await wappalyzer.open(domain_ip_formatted).analyze();
        console.log("results,technologies: = ", results.technologies)
        return results.technologies

    } catch (error) {
        console.error(error)
    }

    await wappalyzer.destroy()
}

module.exports = scanDomain;