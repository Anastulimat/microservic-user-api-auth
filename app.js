/***
 * App requirements
 */
const express = require("express");
const app = express();

/**
 Enable environment variables
 */
require('dotenv').config();

/**
 * DB requirements
 */
require("./db");

const ROOT = __dirname + '/';

app.get('/api', (req, res) => {
    res.status(200).send('API works.');
});

const UserController = require(ROOT + 'user/UserController');
app.use('/api/users', UserController);

const AuthController = require(ROOT + 'auth/AuthController');
app.use('/api/auth', AuthController);

module.exports = app;

