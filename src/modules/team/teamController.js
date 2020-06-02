const express = require('express');

const { verifyUserLoggedService } = require('@auth/services/verifyUserLoggedService');
const { verifyUserIsTeamAdminService } = require('@team/services/verifyUserIsTeamAdminService');
const createTeamOperation = require('@team/operations/createTeamOperation');
const addPlayerToTeamOperation = require('@team/operations/addPlayerToTeamOperation');



let router = express.Router();


/**
 * headers: Authorization (token)
 * request body: name, location, color1, color2
 * response body: teamId, teamName
 */
router.post('/create', verifyUserLoggedService, createTeamOperation);

router.post('/:teamId/add-player', verifyUserLoggedService, verifyUserIsTeamAdminService, addPlayerToTeamOperation);



module.exports = router;