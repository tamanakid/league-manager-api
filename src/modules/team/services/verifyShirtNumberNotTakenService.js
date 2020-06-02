const Player = require("@player/models/PlayerModel");
const { GLOBAL_DB_ERROR } = require('@/utils/globalResponses').resNames;
const { TEAM_SHIRT_NUMBER_TAKEN } = require('@team/utils/teamResponses').resNames;



exports.verifyShirtNumberNotTakenService = (req, res, next) => {

	const shirtNumber = req.body.shirtNumber;
	const team = res.locals.team;

	Player.find({ team: team.id }).then((players) => {
		if (players.find((player) => player.shirtNumber === shirtNumber) === undefined) {
			next();
		} else {
			next(TEAM_SHIRT_NUMBER_TAKEN);
		}
	})

	.catch(() => {
		next(GLOBAL_DB_ERROR);
	});

};