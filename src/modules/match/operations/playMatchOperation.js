const { GLOBAL_DB_ERROR } = require('@/utils/globalResponses').resNames;



const playMatchOperation = (req, res, next) => {

	const league = res.locals.league;
	const match = res.locals.match;

	const { homeApps, awayApps, homeGoalscorers, awayGoalscorers } = req.body;
	const homeGoals = homeGoalscorers.length
	const awayGoals = awayGoalscorers.length

	match.updateOne({
		homeGoals,
		awayGoals,
		homeApps,
		awayApps,
		homeGoalscorers,
		awayGoalscorers,
		isPlayed: true,
	})

	.then(() => {
		next();
	})

	.catch((err) => {
		console.log("playMatchOperation", err);
		next(GLOBAL_DB_ERROR);
	});

};



module.exports = playMatchOperation;