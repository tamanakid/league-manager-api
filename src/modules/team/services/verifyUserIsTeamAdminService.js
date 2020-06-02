const ObjectID = require("mongodb").ObjectID

const Team = require('@team/models/TeamModel');
const { GLOBAL_DB_ERROR } = require('@/utils/globalResponses').resNames;
const { TEAM_NOT_FOUND, TEAM_UNAUTHORIZED } = require('@team/utils/teamResponses').resNames;



exports.verifyUserIsTeamAdminService = (req, res, next) => {

	const teamId = req.params.teamId;

	Team.findById(teamId).then((team) => {
		if (team) {
			
			const user = res.locals.user;

			if (team.admin.equals(user._id)) {
				res.locals.team = team;
				next();
			} else {
				next(TEAM_UNAUTHORIZED);
			}

		} else {
			next(TEAM_NOT_FOUND)
		}
	})

	.catch((err) => {
		next(GLOBAL_DB_ERROR);
	})

};

