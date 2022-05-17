
//Routing
const express = require('express');
const customerRoutes = require('./app/Routes/customer.routes');
const userRoutes = require('./app/Routes/user.routes');
const { json, urlencoded } = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');



async function main() {
    //express config
    var corsOptions = {
        origin: "http://localhost:3000",
        credentials: true // Allow localhost:3000 to access the cookies
    };
    const app = express();
    app.use(cors(corsOptions));
    //parse requests of content type - application/json
    app.use(json());
    //parse
    app.use(urlencoded({ extended: true }));
    // Cookies for json web tokens
    app.use(cookieParser());
    //Setting routes to the express server
    customerRoutes(app);
    userRoutes(app);
    const port2 = 4000;
    //connecting the server
    app.listen(port2, console.log(`Server started on port ${port2}`));
}





main();
