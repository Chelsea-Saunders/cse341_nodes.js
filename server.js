const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');

const port = process.env.PORT || 3030;
const app = express();

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'))
  
  .use((err, rq, res, next) => {
    console.error(err);

    if (res.headersSent) {
      return next(err);
    }

    const statusCode = Number.isInteger(err.statusCode)
      ? err.statusCode  
      : 500;

    const message = 
      statusCode >= 500 ? 'Internal server error' : err.messae;

    res.status(statusCode).json({ message });
  });

mongodb.initDb((err) => {
  if (err) {
    console.error(`Failed to connect to the database ${err}`);
    process.exit(1);
  }
  app.listen(port, () => {
    console.log(`Connected to DB and listening on port ${port}`)
  });
});