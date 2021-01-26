'use strict';
require('dotenv').config();

const pgp = require('pg-promise')({
    query: (event) => {
        console.log('QUERY: ', event.query);
    },
});

const db = pgp(process.env.HEROKU_POSTGRESQL_CHARCOAL_URL);

module.exports = db;
