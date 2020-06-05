const ObjectID = require("mongodb").ObjectID

const Table = require('@table/models/TableModel');
const { GLOBAL_DB_ERROR } = require('@/utils/globalResponses').resNames;



const updateTableOperation = (req, res, next) => {

	const { league, match } = res.locals;
	const { homeGoalscorers, awayGoalscorers } = req.body;
	const { homeTeam, awayTeam } = match;
	const homeGoals = homeGoalscorers.length;
	const awayGoals = awayGoalscorers.length;

	Table.findOne({ league }).then((table) => {
		let homeTable = table.teams.find((team) => team._id.equals(homeTeam._id));
		let awayTable = table.teams.find((team) => team._id.equals(awayTeam._id));

		homeTable.gamesPlayed++;
		awayTable.gamesPlayed++;
		if (homeGoals > awayGoals) {
			homeTable.points += 3;
			homeTable.gamesWon++;
			awayTable.gamesLost++;
		} else if (homeGoals < awayGoals) {
			awayTable.points += 3;
			awayTable.gamesWon++;
			homeTable.gamesLost++;
		} else if (homeGoals === awayGoals) {
			homeTable.points++;
			awayTable.points++;
			awayTable.gamesDrawn++;
			homeTable.gamesDrawn++;
		}
		homeTable.goalsFor += homeGoals;
		awayTable.goalsFor += awayGoals;
		homeTable.goalsAgainst += awayGoals;
		awayTable.goalsAgainst += homeGoals;
		homeTable.goalsDifference = homeTable.goalsDifference + homeGoals - awayGoals;
		awayTable.goalsDifference = awayTable.goalsDifference + awayGoals - homeGoals;

		table.save().then(() => {
			next();
		})

	})

	.catch((err) => {
		console.log("update table", err);
		next(GLOBAL_DB_ERROR);
	});

}



module.exports = updateTableOperation;
