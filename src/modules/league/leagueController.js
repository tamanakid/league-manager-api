const express = require('express');

const { verifyUserLoggedService } = require('@auth/services/verifyUserLoggedService');
const createLeagueOperation = require('@league/operations/createLeagueOperation');


let router = express.Router();


router.post('/create', verifyUserLoggedService, createLeagueOperation);



module.exports = router;