const Team = require('@team/models/TeamModel');
const League = require('@league/models/LeagueModel');
const Table = require('@table/models/TableModel');

const { GLOBAL_DB_ERROR } = require('@/utils/globalResponses').resNames;
const { TABLE_NOT_FOUND } = require('@table/utils/tableResponses').resNames;
const { LEAGUE_FULL } = require('@league/utils/leagueResponses').resNames;



const addTeamToLeagueOperation = (req, res, next) => {

	const team = res.locals.team;
	const league = res.locals.league;

	Table.findOne({ league }).then((table) => {
		if (!table) {
			next(TABLE_NOT_FOUND);
		} else {

			table.teams.push({
				_id: team,
				teamName: team.name,
				teamAbbr: team.abbr,
			})

			table.save().then(() => {
				res.status(200).json({
					leagueId: league.id,
					teamId: team.id,
				});
			})

			.catch(() => {
				next(GLOBAL_DB_ERROR);
			});
		}
	})

	.catch(() => {
		next(GLOBAL_DB_ERROR);
	});

};



module.exports = addTeamToLeagueOperation;