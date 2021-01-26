'use strict';

const http = require('http');

const port = process.env.PORT || 3333;

const express = require('express');
const app = express();

app.use(express.json());
app.use(
    express.urlencoded({
        extended: false,
    })
);

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server running at ${port}`);
});

const rootController = require('./routes/root');
const usersController = require('./routes/users');
const demoController = require('./routes/demo');

app.use('/', rootController);
app.use('/users', usersController);

app.use('/demo', demoController);
