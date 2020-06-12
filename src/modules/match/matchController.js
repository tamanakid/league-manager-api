const express = require('express');

// Import Operations and Services
const { verifyUserLoggedService } = require('@auth/services/verifyUserLoggedService');
const { verifyUserIsLeagueAdminService } = require('@league/services/verifyUserIsLeagueAdminService');
const { verifyMatchLeagueService } = require('@match/services/verifyMatchLeagueService');
const playMatchOperation = require('@match/operations/playMatchOperation');
const updateTableOperation = require('@table/operations/updateTableOperation');
const updatePlayerStatsOperation = require('@player/operations/updatePlayerStatsOperation');
const getMatchInfoQueryOperation = require('@match/operations/getMatchInfoQueryOperation');



let router = express.Router();

// Define routes
router.put('/:matchId/play', verifyUserLoggedService, verifyMatchLeagueService, verifyUserIsLeagueAdminService, playMatchOperation, updateTableOperation, updatePlayerStatsOperation);

router.get('/:matchId/get-info', getMatchInfoQueryOperation);


module.exports = router;