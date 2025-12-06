'use strict';

const Hapi = require('@hapi/hapi');
const path = require('path');
const fs = require('fs');
const { Model } = require('objection');
const Knex = require('knex');
const knexConfig = require('./knexfile');
const HapiAuthJwt2 = require('hapi-auth-jwt2');
const JWT_SECRET = '17F5DDF52CFE6A9C5A434CBA4AE9DF5D52B45B36CB1C0E2F52AF743DF279B5A6'; 

const validate = async (decoded, request, h) => {
    if (!decoded.roles) {
        return { isValid: false };
    }
    const credentials = {
        ...decoded, 
        scope: decoded.roles 
    };
    return {
        isValid: true,
        credentials: credentials
    };
};

const initDatabase = () => {
    const knex = Knex(knexConfig.development);
    Model.knex(knex);
};


const init = async () => {
    initDatabase();
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.events.on('request', (request, event, tags) => {
        if (tags.error && event.error) {
            console.error('SERVER EVENT ERROR CAUGHT:');
            console.error('Message:', event.error.message || 'No message provided');
            console.error('Stack:', event.error.stack || 'No stack provided');
        }
    });

    const routes = [];
    const routesPath = path.join(__dirname,'routes');

    await server.register({
        plugin: HapiAuthJwt2 
    });

    server.auth.strategy('jwt', 'jwt', {
        key: JWT_SECRET,
        validate: validate,
        urlKey: false,
        cookieKey: false,
        
        verifyOptions: {
            algorithms: ['HS256']
        }
    });

    fs.readdirSync(routesPath).forEach((file) => {
        const filePath = path.join(routesPath, file);
        const exportedRoutes = require(filePath);
        routes.push(...exportedRoutes);
    });

    server.route(routes);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.error('UNHANDLED REJECTION CAUGHT:');
    console.error('Message:', err.message);
    console.error('Stack:', err.stack || err);
    process.exit(1);
});

init();
