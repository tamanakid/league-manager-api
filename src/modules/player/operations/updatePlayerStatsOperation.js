const PlayerLeagueStats = require('@player/models/PlayerLeagueStatsModel');
const { GLOBAL_DB_ERROR } = require('@/utils/globalResponses').resNames;



const updatePlayerStatsOperation = (req, res, next) => {

	const { homeApps, awayApps, homeGoalscorers, awayGoalscorers } = req.body;

	PlayerLeagueStats.updateMany(
		{ player: { $in: [ ...homeApps, ...awayApps] }},
		{ $inc: { appearances: 1 } },
	)

	.then(() => {
		const allGoalscorers = [ ...homeGoalscorers, ...awayGoalscorers].map((goalscorer) => goalscorer.player);

		let processed = 0;
		const nroGoals = allGoalscorers.length;
		allGoalscorers.forEach((player) => {

			PlayerLeagueStats.update(
				{ player },
				{ $inc: { goals: 1 } }
			)

			.then(() => {
				processed++;
				if (processed === nroGoals) {
					res.status(200).json();
				}
			});
		});		
	})

	.catch((err) => {
		console.log("update player stats", err);
		next(GLOBAL_DB_ERROR);
	});

}



module.exports = updatePlayerStatsOperation;