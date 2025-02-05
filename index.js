'use strict';

const Hapi = require('@hapi/hapi');
const Mongoose = require("mongoose"); // Inkludera mongoose
require("dotenv").config(); // Inkluder dotenv 

const init = async () => {

    const server = Hapi.server({
        port: process.env.PORT || 5000, // Port 5000 för backend 
        host: process.env.HOST || 'localhost',
        routes: {
            cors: {
                origin: ["*"] // Tillåt alla cors-anrop
            }
        }
    });

     // Anslut till mongoDB
     Mongoose.connect(process.env.DATABASE).then(() => {
        console.log("Ansluten till MongoDB");
    }).catch((error) => {
        console.error("Något gick fel vid anslutning till databasen: " + error); 
    });

    // Inkludera routes
    require("./routes/todo.route")(server);


    await server.start(); // Starta server 
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init(); // Kör igång servern