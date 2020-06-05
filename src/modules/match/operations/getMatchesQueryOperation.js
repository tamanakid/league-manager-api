const Match = require('@match/models/MatchModel');
const { GLOBAL_DB_ERROR } = require('@/utils/globalResponses').resNames;



const getMatchesQueryOperation = (req, res, next) => {

	const leagueId = req.params.leagueId;
	const nextGames = req.query.next && Number(req.query.next);
	const lastGames = req.query.last && Number(req.query.last);

	if (nextGames) {
		Match.find({
			league: leagueId,
			isPlayed: false,
		})
		.sort({ date: 1 })
		.limit(nextGames)
		 
		.then((matches) => {
			res.status(201).send({
				leagueId,
				matches,
			});
		})

		.catch((err) => {
			console.log(err);
			next(GLOBAL_DB_ERROR);
		});
	}


	else if (lastGames) {
		Match.find({
			league: leagueId,
			isPlayed: true,
		})
		.sort({ date: -1 })
		.limit(lastGames)
		 
		.then((matches) => {
			res.status(201).send({
				leagueId,
				matches,
			});
		})

		.catch(() => {
			next(GLOBAL_DB_ERROR);
		});	
	}
}



module.exports = getMatchesQueryOperation;