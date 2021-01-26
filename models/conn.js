'use strict';
require('dotenv').config();

const pgp = require('pg-promise')({
    query: (event) => {
        console.log('QUERY: ', event.query);
    },
});

const cn = {
    connectionString: process.env.HEROKU_POSTGRESQL_CHARCOAL_URL,
};
const db = pgp(cn);

module.exports = db;
