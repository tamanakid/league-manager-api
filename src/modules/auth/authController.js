const express = require('express');
const signupOperation = require('@auth/operations/signupOperation');

let router = express.Router();


router.post('/signup', signupOperation);


module.exports = router;
