'use strict';

const http = require('http');

const hostname = '127.0.0.1';
const port = 3333;

const express = require('express');
const app = express();

app.use(express.json());
app.use(
    express.urlencoded({
        extended: false,
    })
);

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});

const demoController = require('./routes/demo');

app.use('/demo', demoController);
