const express = require('express');

const checkUserExistsService = require('@auth/services/checkUserExistsService');
const signupOperation = require('@auth/operations/signupOperation');
const loginOperation = require('@auth/operations/loginOperation');


let router = express.Router();


router.post('/signup', checkUserExistsService.checkUsernameAndEmail, signupOperation);

router.post('/login', checkUserExistsService.checkUsernameOrEmail, loginOperation);


module.exports = router;
