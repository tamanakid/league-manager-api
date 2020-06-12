const Match = require('@match/models/MatchModel');
const Player = require('@player/models/PlayerModel');
const { GLOBAL_DB_ERROR } = require('@/utils/globalResponses').resNames;
const { MATCH_NOT_FOUND } = require('@match/utils/matchResponses').resNames;



const getMatchInfoQueryOperation = (req, res, next) => {

	const matchId = req.params.matchId;

	Match.findById(matchId).then((match) => {
		if (!match) {
			next(MATCH_NOT_FOUND);
		} else {

			let allPlayerIds = [ ...match.homeApps, ...match.awayApps ];
			Player.find({ '_id': { $in: allPlayerIds }}).then((players) => {

				res.status(200).json({
					match,
					players
				});
			});
		}


	})

	.catch(() => {
		next(GLOBAL_DB_ERROR);
	});

}


module.exports = getMatchInfoQueryOperation;