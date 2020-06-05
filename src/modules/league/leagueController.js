const express = require('express');

const { verifyUserLoggedService } = require('@auth/services/verifyUserLoggedService');
const { verifyUserIsLeagueAdminService } = require('@league/services/verifyUserIsLeagueAdminService');
const createLeagueOperation = require('@league/operations/createLeagueOperation');
const addTeamToLeagueOperation = require('@league/operations/addTeamToLeagueOperation');
const createLeagueTableOperation = require('@table/operations/createLeagueTableOperation');
const addTeamToLeagueTableOperation = require('@table/operations/addTeamToLeagueTableOperation');
const generateRoundRobinOperation = require('@match/operations/generateRoundRobinOperation');
const editMatchesInfoOperation = require('@match/operations/editMatchesInfoOperation');



let router = express.Router();



router.post('/create', verifyUserLoggedService, createLeagueOperation, createLeagueTableOperation);

router.post('/:leagueId/add-team', verifyUserLoggedService, verifyUserIsLeagueAdminService, addTeamToLeagueOperation, addTeamToLeagueTableOperation);


router.post('/:leagueId/generate-round-robin', verifyUserLoggedService, verifyUserIsLeagueAdminService, generateRoundRobinOperation);

router.put('/:leagueId/edit-matches-info', verifyUserLoggedService, verifyUserIsLeagueAdminService, editMatchesInfoOperation);


module.exports = router;
