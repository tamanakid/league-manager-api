const express = require('express');

const { verifyUserLoggedService } = require('@auth/services/verifyUserLoggedService');
const { verifyUserIsLeagueAdminService } = require('@league/services/verifyUserIsLeagueAdminService');
const createLeagueOperation = require('@league/operations/createLeagueOperation');
const addTeamToLeagueOperation = require('@league/operations/addTeamToLeagueOperation');



let router = express.Router();


router.post('/create', verifyUserLoggedService, createLeagueOperation);

router.post('/:leagueId/add-team', verifyUserLoggedService, verifyUserIsLeagueAdminService, addTeamToLeagueOperation);



module.exports = router;