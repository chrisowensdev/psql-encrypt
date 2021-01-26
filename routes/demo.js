'use strict';

const express = require('express');
const db = require('../models/conn');
const router = express.Router();

const usersList = require('../models/demoModel');

router.get('/', (req, res) => {
    res.send(200);
});

router.post('/create', async (req, res) => {
    const { username, email, password, rider_name, medical_info } = req.body;
    console.log(
        username,
        email,
        password,
        rider_name,
        JSON.stringify(medical_info)
    );
    const userInstance = new usersList(
        null,
        username,
        email,
        password,
        rider_name,
        JSON.stringify(medical_info)
    );
    const response = await userInstance.createUser();
    console.log(response);
    res.json(response);
});

router.get('/encrypted', async (req, res) => {
    const { email } = req.body;
    const user = await usersList.getEncrypted(email);
    console.log(user);
    res.json({
        parentOne: {
            firstName: user.username,
        },
        password: user.password,
    });
});

router.get('/decrypted', async (req, res) => {
    const { email } = req.body;
    const user = await usersList.getDecrypted(email);
    console.log(user);
    res.json({
        medical_info: JSON.parse(user.medical_info),
    });
});

module.exports = router;
