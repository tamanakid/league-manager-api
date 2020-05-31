const express = require('express');

const { verifyUserLoggedService } = require('@auth/services/verifyUserLoggedService');
const createTeamOperation = require('@team/operations/createTeamOperation');



let router = express.Router();


/**
 * headers: Authorization (token)
 * request body: name
 * response body: teamId, teamName
 */
router.post('/create', verifyUserLoggedService, createTeamOperation);



module.exports = router;