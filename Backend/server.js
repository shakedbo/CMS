
//Routing
const express = require('express');
const routes = require('./app/Routes');
const { json, urlencoded } = require('body-parser');
const cors = require('cors');

/**
 * DataBase connecting
 */
const mongoose = require('mongoose');
const db = require('./app/Schemas/KeysToRemote').MongoURI;
mongoose.connect(db, { useNewUrlParser: true })
    .then(console.log('[+] MongoDB connected ...'))
    .catch(err => console.error(err));


async function main() {
    //express config
    var corsOptions = {
        origin: "http://localhost:3000"
    };
    const app = express();
    app.use(cors(corsOptions));
    //parse requests of content type - application/json
    app.use(json());
    //parse
    app.use(urlencoded({ extended: true }));

    //Setting routes to the express server
    routes(app);
    const port2 = 4000;
    //connecting the server
    app.listen(port2, console.log(`Server started on port ${port2}`));
}





main();
