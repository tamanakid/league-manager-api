const Table = require('@table/models/TableModel');
const { GLOBAL_DB_ERROR } = require('@/utils/globalResponses').resNames;



function sortPositions (team1, team2) {
	return (team1.points > team2.points) ? -1 :
	((team1.points === team2.points) && (team1.goalsDifference > team2.goalsDifference)) ? -1 :
	((team1.points === team2.points) && (team1.goalsDifference === team2.goalsDifference) && (team1.goalsFor > team2.goalsFor)) ? -1 : 1;
}



const getTableQueryOperation = (req, res, next) => {

	const leagueId = req.params.leagueId;
	Table.findOne({ league: leagueId }).then((table) => {
		let leagueTable = table.teams;
		
		leagueTable.sort(sortPositions);

		res.status(200).json({ leagueTable });

	})

	.catch((err) => {
		console.log(err);
		next(GLOBAL_DB_ERROR);
	});
}


module.exports = getTableQueryOperation;