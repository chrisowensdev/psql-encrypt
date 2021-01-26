'use strict';
require('dotenv').config();

const pgp = require('pg-promise')({
    query: (event) => {
        console.log('QUERY: ', event.query);
    },
});

const db = pgp(process.env.DATABASE_URL);

module.exports = db;
