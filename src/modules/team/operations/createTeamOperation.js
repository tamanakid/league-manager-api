const Team = require("@team/models/TeamModel");
const { GLOBAL_DB_ERROR } = require('@/utils/globalResponses').resNames;



const createTeamOperation = (req, res, next) => {

	const user = res.locals.user;

	Team.create({
		name: req.body.name,
		abbr: req.body.abbr,
		location: req.body.location,
		color1: req.body.color1,
		color2: req.body.color2,
		admin: user,
	})

	.then((team) => {
		res.status(201).json({
			teamId: team.id,
			teamName: team.name,
		})
	})
	
	.catch(() => {
		next(GLOBAL_DB_ERROR);
	})

};



module.exports = createTeamOperation;