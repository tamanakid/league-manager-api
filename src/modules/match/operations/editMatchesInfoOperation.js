const mongoose = require('mongoose');
const ObjectID = require("mongodb").ObjectID

const Match = require('@match/models/MatchModel');
const { GLOBAL_DB_ERROR } = require('@/utils/globalResponses').resNames;



const editMatchesInfoOperation = (req, res, next) => {

	const league = res.locals.league;
	const newMatches = req.body.matches;
	const nroMatches = newMatches.length;
	const matchesId = newMatches.map((match) => mongoose.Types.ObjectId(match.id));

	Match.find({ league: league._id, '_id': { $in: matchesId } })
	.then((oldMatches) => {
		let matchesModified = [];
		let matchesFailed = [];

		let nroProcessed = 0;
		oldMatches.forEach((oldMatch) => {
			let newMatch = newMatches.find((match) => oldMatch._id.equals(match.id));
			oldMatch.venue = newMatch.venue;
			oldMatch.date = newMatch.date;

			oldMatch.save()
			.then(({ id, venue, date }) => {
				matchesModified.push({ id, venue, date });
			})
			.catch(() => {
				matchesFailed.push({ id });
			})

			.finally(() => {
				nroProcessed++;
				if (nroProcessed === nroMatches) {
					if (matchesModified.length) {
						res.status(200).json({
							matchesModified,
							matchesFailed,
						});
					} else {
						next(GLOBAL_DB_ERROR);
					}
				}
			});
		});
	})


	.catch(() => {
		next(GLOBAL_DB_ERROR);
	});	
}




module.exports = editMatchesInfoOperation;