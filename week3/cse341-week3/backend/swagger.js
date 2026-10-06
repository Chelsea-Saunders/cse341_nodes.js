import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'My API', 
        description: 'API Documnetation'
    },
    host: 'localhost:8080', 
    schemas: ['http', 'https'], 
    definitions: {
        Contact: {
            firstName: 'Donald', 
            lastName: 'Duck', 
            email: 'donald@duck.com', 
            favoriteColor: 'Orange', 
            birthday: '1992-02-29'
        }
    }
};

const outputFile = './swagger-output.json';
const routes = ['./server.js'];

swaggerAutogen()(outputFile, routes, doc);