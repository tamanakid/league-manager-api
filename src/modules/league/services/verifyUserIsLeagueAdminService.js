const ObjectID = require("mongodb").ObjectID

const League = require('@league/models/LeagueModel');
const { GLOBAL_DB_ERROR } = require('@/utils/globalResponses').resNames;
const { LEAGUE_NOT_FOUND, LEAGUE_UNAUTHORIZED } = require('@league/utils/leagueResponses').resNames;



exports.verifyUserIsLeagueAdminService = (req, res, next) => {

	const leagueId = req.params.leagueId;

	League.findById(leagueId).then((league) => {
		if (league) {
			
			const user = res.locals.user;

			if (league.admin.equals(user._id)) {
				res.locals.league = league;
				next();
			} else {
				next(LEAGUE_UNAUTHORIZED);
			}

		} else {
			next(LEAGUE_NOT_FOUND)
		}
	})

	.catch((err) => {
		next(GLOBAL_DB_ERROR);
	})

};

