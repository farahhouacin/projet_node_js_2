// Import all 
const express = require('express');
const bodyParser = require('body-parser');
const messageRoute = require('./routes/message');

// Create app
const app = express();

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


// Start app
app.listen(8080, () => {
    console.log('Serveur running on port 8080');
})
