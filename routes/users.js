'use strict';

const express = require('express');
const db = require('../models/conn');
const router = express.Router();

const usersList = require('../models/usersModel');

router.get('/', (req, res) => {
    res.send(200);
});

router.post('/signup', async (req, res) => {
    const {
        first_name,
        last_name,
        email,
        password,
        team,
        rider_info,
        medical_info,
    } = req.body;
    console.log(
        first_name,
        last_name,
        email,
        password,
        team,
        rider_info,
        medical_info
    );
    const userInstance = new usersList(
        null,
        first_name,
        last_name,
        email,
        password,
        team,
        JSON.stringify(rider_info),
        JSON.stringify(medical_info)
    );
    const response = await userInstance.createUser();
    console.log(response);
    res.json(response);
});

module.exports = router;
