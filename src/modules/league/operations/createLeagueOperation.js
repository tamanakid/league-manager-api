const League = require('@league/models/LeagueModel');
const { GLOBAL_DB_ERROR } = require('@/utils/globalResponses').resNames;



const createLeagueOperation = (req, res, next) => {
	
	const user = res.locals.user;

	League.create({
		name: req.body.name,
		admin: user,
		location: req.body.location,
		numberOfTeams: req.body.numberOfTeams,
	})

	.then((league) => {
		res.locals.league = league;
		next();
	})
	
	.catch(() => {
		next(GLOBAL_DB_ERROR);
	})

}


module.exports = createLeagueOperation;