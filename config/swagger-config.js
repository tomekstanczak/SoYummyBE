const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'So Yummy',
            version: '1.0.0',
            description: 'Management System covered Create, Read, Update and Delete operations using a Node.js API',
        },
        servers: [
            { url: 'http://localhost:8000' },
        ],
    },

    apis: ['../routes/*.js'],
};