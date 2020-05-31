const League = require('@league/models/LeagueModel');
const Team = require('@team/models/TeamModel');

const { GLOBAL_DB_ERROR } = require('@/utils/globalResponses').resNames;
const { TEAM_NOT_FOUND } = require('@team/utils/teamResponses').resNames;
const { LEAGUE_FULL } = require('@league/utils/leagueResponses').resNames;



const addTeamToLeagueOperation = (req, res, next) => {

	const teamId = req.body.teamId;
	const league = res.locals.league;

	Team.findById(teamId).then((team) => {
		if (!team) {
			next(TEAM_NOT_FOUND);
		} else {

			if (league.numberOfTeams === league.teams.length) {
				next(LEAGUE_FULL);
			} else {
				
				league.teams.push(team.id);
				league.save().then((league) => {

					team.leagues.push(league.id);
					team.save().then((team) => {

						res.status(200).json({
							leagueId: league.id,
							teamId: team.id,
						});

					})

					.catch(() => {
						league.teams.pop();
						league.save().then(() => {
							next(GLOBAL_DB_ERROR);
						});
					});
				})

				.catch(() => {
					next(GLOBAL_DB_ERROR);
				});
			}
		}
	})

	.catch(() => {
		next(GLOBAL_DB_ERROR);
	})

};



module.exports = addTeamToLeagueOperation;