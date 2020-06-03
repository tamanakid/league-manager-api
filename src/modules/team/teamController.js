const express = require('express');

const { verifyUserLoggedService } = require('@auth/services/verifyUserLoggedService');
const { verifyUserIsTeamAdminService } = require('@team/services/verifyUserIsTeamAdminService');
const { verifyShirtNumberNotTakenService } = require('@team/services/verifyShirtNumberNotTakenService');
const createTeamOperation = require('@team/operations/createTeamOperation');
const addPlayerToTeamOperation = require('@team/operations/addPlayerToTeamOperation');



let router = express.Router();



router.post('/create', verifyUserLoggedService, createTeamOperation);


/* Team Players endpoints */

router.post('/:teamId/add-player', verifyUserLoggedService, verifyUserIsTeamAdminService, verifyShirtNumberNotTakenService, addPlayerToTeamOperation);



module.exports = router;