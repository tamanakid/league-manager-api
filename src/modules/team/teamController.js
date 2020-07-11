const express = require('express');

const { verifyUserLoggedService } = require('@auth/services/verifyUserLoggedService');
const { verifyUserIsTeamAdminService } = require('@team/services/verifyUserIsTeamAdminService');
const { verifyShirtNumberNotTakenService } = require('@team/services/verifyShirtNumberNotTakenService');
const createTeamOperation = require('@team/operations/createTeamOperation');
const addPlayerToTeamOperation = require('@team/operations/addPlayerToTeamOperation');
const getTeamInfoQueryOperation = require('@team/operations/getTeamInfoQueryOperation');
const getTeamPlayersQueryOperation = require('@team/operations/getTeamPlayersQueryOperation');



let router = express.Router();



router.post('/create', verifyUserLoggedService, createTeamOperation);

router.get('/:teamId/get-info', verifyUserLoggedService, getTeamInfoQueryOperation);

router.get('/:teamId/get-players', getTeamPlayersQueryOperation);


/* Team Players endpoints */

router.post('/:teamId/add-player', verifyUserLoggedService, verifyUserIsTeamAdminService, verifyShirtNumberNotTakenService, addPlayerToTeamOperation);



module.exports = router;