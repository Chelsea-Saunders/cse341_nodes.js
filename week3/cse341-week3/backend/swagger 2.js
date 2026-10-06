import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'My API', 
        description: 'API Documnetation'
    },
    host: 'localhost:8080'
};

const outputFile = './swagger-output.json';
const routes = ['./server.js'];

swaggerAutogen()(outputFile, routes, doc);