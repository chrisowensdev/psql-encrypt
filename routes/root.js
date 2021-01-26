'use strict';

const express = require('express');
const db = require('../models/conn');
const router = express.Router();
require('dotenv').config();

router.get('/', (req, res) => {
    res.json({
        msg: 'OK',
    });
});

module.exports = router;
