'use strict';

const Hapi = require('@hapi/hapi');
const path = require('path');
const fs = require('fs');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    const routes = [];
    const routesPath = path.join(__dirname,'routes');


    fs.readdirSync(routesPath).forEach((file) => {
        const filePath = path.join(routesPath, file);
        const exportedRoutes = require(filePath);
        routes.push(...exportedRoutes);

    })

    server.route(routes)

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
