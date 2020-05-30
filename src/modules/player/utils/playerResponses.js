const resNames = {
	PLAYER_NOT_FOUND: 'PLAYER_NOT_FOUND',
};

const responses = {
	[resNames.PLAYER_NOT_FOUND]: (res) => {
		res.status(404).json({
			message: 'The player was not found in the database',
		});
	},
};

module.exports = { responses, resNames };