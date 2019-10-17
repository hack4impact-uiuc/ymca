const fetch = require('isomorphic-unfetch');
const express = require('express');
const router = express.Router();
const {errorWrap} = require('../middleware');

const {AUTH_SERVER_URI} = require('../dotenvVars');
const AUTH_SERVER_REGISTER_URI = AUTH_SERVER_URI + '/register';

router.post('/', errorWrap(async (req, res) => {
    const {email, password, companyId} = req.body;
    const authReqBody = {
        email,
        password,
        companyId,
        role: 'admin',
    };

    const authResults = await fetch(AUTH_SERVER_REGISTER_URI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(authReqBody),
    });

    const authResponse = await authResults.json();
    if (res.code === 200) {
        // create user object
        
        // send token & success 😄
        res.json({
            status: 200
        })
    } else {
        // something went wrong on the auth server's end 😨
        res.json(authResponse);
    }
}));

module.exports = router;