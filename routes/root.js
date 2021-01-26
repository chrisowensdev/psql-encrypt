'use strict';

const express = require('express');
const db = require('../models/conn');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('OK');
});

module.exports = router;
