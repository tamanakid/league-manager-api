const Team = require("@team/models/TeamModel");
const { GLOBAL_DB_ERROR } = require('@/utils/globalResponses').resNames;



const createTeamOperation = (req, res, next) => {

	const user = res.locals.user;

	Team.create({
		name: req.body.name,
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