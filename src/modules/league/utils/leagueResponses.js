const resNames = {
	LEAGUE_NOT_FOUND: "LEAGUE_NOT_FOUND",
	LEAGUE_UNAUTHORIZED: "LEAGUE_UNAUTHORIZED",
	LEAGUE_FULL: "LEAGUE_FULL",
};



const responses = {
	[resNames.LEAGUE_NOT_FOUND]: (res) => {
		res.status(404).json({
			message: 'The league was not found in the database',
		});
	},

	[resNames.LEAGUE_UNAUTHORIZED]: (res) => {
		res.status(403).json({
			message: 'This user is not authorized to perform operations on this league',
		});
	},

	[resNames.LEAGUE_FULL]: (res) => {
		res.status(409).json({
			message: 'The league is already to its maximum capacity and no more teams can be added',
		});
	},
	
};



module.exports = { responses, resNames };