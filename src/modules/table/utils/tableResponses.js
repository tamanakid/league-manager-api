const resNames = {
	TABLE_NOT_FOUND: 'TABLE_NOT_FOUND',
};

const responses = {
	[resNames.TABLE_NOT_FOUND]: (res) => {
		res.status(404).json({
			message: 'The table was not found in the database',
		});
	},
};

module.exports = { responses, resNames };