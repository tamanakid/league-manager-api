const Table = require('@table/models/TableModel');
const { GLOBAL_DB_ERROR } = require('@/utils/globalResponses').resNames;



const createLeagueTableOperation = (req, res, next) => {

	const league = res.locals.league;

	Table.create({ league	}).then((table) => {
		res.status(201).json({
			leagueId: league.id,
			leagueName: league.name,
		})
	})

	.catch(() => {
		next(GLOBAL_DB_ERROR);
	});

}


module.exports = createLeagueTableOperation;