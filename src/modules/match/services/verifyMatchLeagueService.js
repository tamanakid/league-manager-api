const Match = require('@match/models/MatchModel');
const League = require('@league/models/LeagueModel');
const { GLOBAL_DB_ERROR } = require('@/utils/globalResponses').resNames;



exports.verifyMatchLeagueService = (req, res, next) => {

	const matchId = req.params.matchId;

	Match.findById(matchId).then((match) => {
		League.findById(match.league).then((league) => {
			
			res.locals.match = match;
			res.locals.league = league;
			res.locals.leagueId = league._id;
			next();
		});
	})

	.catch(() => {
		next(GLOBAL_DB_ERROR);
	});
};
