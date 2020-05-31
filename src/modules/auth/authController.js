const express = require('express');

const checkUserExistsService = require('@auth/services/checkUserExistsService');
const signupOperation = require('@auth/operations/signupOperation');
const loginOperation = require('@auth/operations/loginOperation');


let router = express.Router();


/**
 * request body: username, password, email, name
 * response body: userId, username
 */
router.post('/signup', checkUserExistsService.checkUsernameAndEmail, signupOperation);

/**
 * request body: usernameOrEmail, password
 * response body: userId, token
 */
router.post('/login', checkUserExistsService.checkUsernameOrEmail, loginOperation);



module.exports = router;
