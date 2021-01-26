'use strict';

const http = require('http');

const hostname = '127.0.0.1';
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
const demoController = require('./routes/demo');

app.use('/', rootController);
app.use('/demo', demoController);
