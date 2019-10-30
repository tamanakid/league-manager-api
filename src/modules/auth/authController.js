const express = require('express');
const checkUserExistsService = require('@auth/services/checkUserExistsService');
const signupOperation = require('@auth/operations/signupOperation');

let router = express.Router();


router.post('/signup', checkUserExistsService.checkUsernameAndEmail, signupOperation);


module.exports = router;
