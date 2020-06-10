const ObjectID = require("mongodb").ObjectID

const Player = require('@player/models/PlayerModel');
const PlayerLeagueStats = require('@player/models/PlayerLeagueStatsModel');
const { GLOBAL_DB_ERROR } = require('@/utils/globalResponses').resNames;



const getTeamPlayersQueryOperation = (req, res, next) => {

	const teamId = req.params.teamId;

	Player.find({ team: teamId }).then((players) => {

		const playersIds = players.map((player) => player._id);
		PlayerLeagueStats.find({ player: { $in: playersIds } }).then((stats) => {

			let fullPlayersInfo = [];

			players.forEach((player) => {
				let fullPlayerInfo = stats.reduce((totalStats, leagueStats) => {
					if (leagueStats.player.equals(player.id)) {
						totalStats.appearances += leagueStats.appearances;
						totalStats.goals += leagueStats.goals;
						totalStats.yellowCards += leagueStats.yellowCards;
						totalStats.redCards += leagueStats.redCards;						
					}
					return totalStats;
				}, { name: player.name, shirtNumber: player.shirtNumber, position: player.position, appearances: 0, goals: 0, yellowCards: 0, redCards: 0 });

				fullPlayersInfo.push(fullPlayerInfo);
			});

			res.status(200).json({ players: fullPlayersInfo	});
		})

	})
	
	.catch(() => {
		next(GLOBAL_DB_ERROR);
	});
}



module.exports = getTeamPlayersQueryOperation;