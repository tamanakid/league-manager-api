const express = require('express');

const { verifyUserLoggedService } = require('@auth/services/verifyUserLoggedService');
const createTeamOperation = require('@team/operations/createTeamOperation');



let router = express.Router();


router.post('/create', verifyUserLoggedService, createTeamOperation);



module.exports = router;