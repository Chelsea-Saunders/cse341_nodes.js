const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Temples API', 
        description: 'Temple API Documentation', 
    },
    host: 'localhost:8080',
    schemas: ['http'],
    definitions: {
        Contact: {
            firstName: 'Donald', 
            lastName: 'Duck', 
            email: 'donald@duck.com',
            favoriteColor: 'Orange', 
            birthday: '1990-02-15'
        }
    }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles);