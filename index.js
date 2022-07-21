// Import all
const express = require('express');
const bodyParser = require('body-parser');
const messageRoute = require('./routes/message');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');

// Create app
const app = express();

// Import swagger
const swaggerUi = require('swagger-ui-express');
swaggerDocument = require('./swagger.json');


// Parse body
app.use(bodyParser.json());

// Response header
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Router redirect
app.use('/topic', messageRoute);
app.use('/auth', authRoutes);

// Use swagger
app.use('/api-docs', swaggerUi.serve,  swaggerUi.setup(swaggerDocument));


mongoose.connect(
        'mongodb+srv://farahhouacin:Chocobon13000@cluster0.2x92ait.mongodb.net/test'
    )
    .then(result => {
      app.listen(8080);
    })
    .catch(err => console.log(err));