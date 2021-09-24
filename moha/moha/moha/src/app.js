const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const UserHandler = require('./handler/userHandler.js');
const Authenticate = require('./common/authenticate.js');

app.use(bodyParser.json());

app.post('/oauth/token', UserHandler.createToken);

app.post('/users', Authenticate.authenticate, UserHandler.createUser);

app.get('/users', Authenticate.authenticate, UserHandler.getUser);

module.exports = app;



























