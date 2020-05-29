const responses = require('@league/utils/responses');
const League = require('@league/models/LeagueModel');



const createLeagueOperation = (req, res, next) => {
	
	const user = res.locals.user;

	League.create({
		name: req.body.name,
		admin: user,
		location: req.body.location,
		numberOfTeams: req.body.numberOfTeams,
	})

	.then((league) => {
		res.status(201).json({
			leagueId: league.id,
			leagueName: league.name,
		})
	})
	
	.catch(() => {
		responses.generic.dbError(res);
	})

}


module.exports = createLeagueOperation;