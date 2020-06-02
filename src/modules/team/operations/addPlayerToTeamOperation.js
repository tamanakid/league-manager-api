const Team = require("@team/models/TeamModel");
const Player = require("@player/models/PlayerModel");
const PlayerLeagueStats = require("@player/models/PlayerLeagueStatsModel");
const { GLOBAL_DB_ERROR } = require('@/utils/globalResponses').resNames;



const addPlayerToTeamOperation = (req, res, next) => {

	const name = req.body.name;
	const shirtNumber = req.body.shirtNumber;
	const position = req.body.position;
	const team = res.locals.team;

	// Create the player associated to the team
	Player.create({	name, shirtNumber, position, team }).then((player) => {

		// Create a relation between the player and each of the team's leagues
		let playerLeagues = team.leagues.map((league) => ({ player: player.id, league }));
		PlayerLeagueStats.insertMany(playerLeagues)
		
		.then((playerLeagueStats) => {
			res.status(201).json({
				playerId: player.id,
				leagueId: playerLeagueStats.league,
			});
		})
		
		.catch((err) => {
			console.log(err);
			next(GLOBAL_DB_ERROR);
		});
	})

	.catch(() => {
		next(GLOBAL_DB_ERROR);
	});


}



module.exports = addPlayerToTeamOperation;