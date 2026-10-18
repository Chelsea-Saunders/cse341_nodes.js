const swaggerAutogen = require('swagger-autogen')();

const host = process.env.NODE_ENV === 'production'
  ? 'cse341-instructor.herokuapp.com'
  : 'localhost:3030';

const schemes = process.env.NODE_ENV === 'production'
  ? ['https']
  : ['http'];

const doc = {
  info: {
    title: 'My API',
    description: 'Temple API'
  },
  host: host,
  schemes: schemes
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

// Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//   await import('./index.js');
// });
