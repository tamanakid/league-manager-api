const resNames = {
	MATCH_NOT_FOUND: 'MATCH_NOT_FOUND',
};

const responses = {
	[resNames.MATCH_NOT_FOUND]: (res) => {
		res.status(404).json({
			message: 'The match was not found in the database',
		});
	},
};

module.exports = { responses, resNames };