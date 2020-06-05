const ObjectID = require("mongodb").ObjectID

const Team = require('@team/models/TeamModel');
const Match = require('@match/models/MatchModel');
const { GLOBAL_DB_ERROR } = require('@/utils/globalResponses').resNames;



const getTeamInfoQueryOperation = (req, res, next) => {

	const teamId = req.params.teamId;

	Team.findById(teamId).then((team) => {

		Match.find({ $or: [ { "homeTeam._id": team.id }, { "awayTeam._id": team.id } ]})
		
		.then((matches) => {
			res.status(200).json({
				team,
				matches,
			});
		})

	})

	.catch((err) => {
		console.log(err);
		next(GLOBAL_DB_ERROR);
	});

	

}



module.exports = getTeamInfoQueryOperation;