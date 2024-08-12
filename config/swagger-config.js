const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');


const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'So Yummy',
        version: '1.0.0',
        description: 'Management System covered Create, Read, Update and Delete operations using a Node.js API',
    },
    servers: [
        {
            url: 'https://so-yummy-31fabc853d58.herokuapp.com/',
        },
        {
            url: 'http://localhost:8000',
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: [path.join(__dirname, '../routes/*.js')],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerSpec, swaggerUi };