const express = require('express');

const { verifyUserLoggedService } = require('@auth/services/verifyUserLoggedService');
const { verifyUserIsLeagueAdminService } = require('@league/services/verifyUserIsLeagueAdminService');
const createLeagueOperation = require('@league/operations/createLeagueOperation');
const addTeamToLeagueOperation = require('@league/operations/addTeamToLeagueOperation');
const createLeagueTableOperation = require('@table/operations/createLeagueTableOperation');
const addTeamToLeagueTableOperation = require('@table/operations/addTeamToLeagueTableOperation');




let router = express.Router();


/**
 * headers: Authorization (token)
 * request body: name, location, numberOfTeams
 * response body: leagueId, leagueName
 */
router.post('/create', verifyUserLoggedService, createLeagueOperation, createLeagueTableOperation);

/**
 * headers: Authorization (token)
 * request body: teamId
 * response body: teamId, leagueId
 */
router.post('/:leagueId/add-team', verifyUserLoggedService, verifyUserIsLeagueAdminService, addTeamToLeagueOperation, addTeamToLeagueTableOperation);



module.exports = router;
