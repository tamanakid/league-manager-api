const resNames = {
	TEAM_NOT_FOUND: "TEAM_NOT_FOUND",
	TEAM_UNAUTHORIZED: "TEAM_UNAUTHORIZED",
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
	
};



module.exports = { responses, resNames };