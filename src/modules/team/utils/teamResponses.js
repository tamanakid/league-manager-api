const resNames = {
	TEAM_NOT_FOUND: "TEAM_NOT_FOUND",
	TEAM_UNAUTHORIZED: "TEAM_UNAUTHORIZED",
	TEAM_SHIRT_NUMBER_TAKEN: "TEAM_SHIRT_NUMBER_TAKEN",
};



const responses = {
	[resNames.TEAM_NOT_FOUND]: (res) => {
		res.status(404).json({
			message: 'The team was not found in the database',
		});
	},

	[resNames.TEAM_UNAUTHORIZED]: (res) => {
		res.status(403).json({
			message: 'This user is not authorized to perform operations on this team',
		});
	},

	[resNames.TEAM_SHIRT_NUMBER_TAKEN]: (res) => {
		res.status(409).json({
			message: 'The shirt number is already taken, please choose another one.',
		});
	},
	
};



module.exports = { responses, resNames };