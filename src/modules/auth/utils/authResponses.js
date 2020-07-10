const resNames = {
	AUTH_USER_EXISTS: "AUTH_USER_EXISTS",
	AUTH_USER_DOESNT_EXIST: "AUTH_USER_DOESNT_EXIST",
	AUTH_INVALID_TOKEN: "AUTH_INVALID_TOKEN",
	AUTH_REGISTER_ERROR: "AUTH_REGISTER_ERROR",
	AUTH_INCORRECT_PASSWORD: "AUTH_INCORRECT_PASSWORD",
	AUTH_INVALID_REFRESH_TOKEN: "AUTH_INVALID_REFRESH_TOKEN",
};



const responses = {

	[resNames.AUTH_USER_EXISTS]: (res) => {
		res.status(409).json({
			message: 'This username or email already exists.',
		});
	},

	[resNames.AUTH_USER_DOESNT_EXIST]: (res) => {
		res.status(404).json({
			message: 'This username or email does not exist.',
		});
	},

	[resNames.AUTH_INVALID_TOKEN]: (res) => {
		res.status(401).json({
			message: 'The user is not logged or the authorization token is incorrect',
		})
	},
	
	[resNames.AUTH_REGISTER_ERROR]: (res) => {
		res.status(409).json({
			message: 'The password was changed, but the register was not succesful. Please register again.'
		});
	},

	[resNames.AUTH_INCORRECT_PASSWORD]: (res) => {
		console.log('incorrect password')
		res.status(401).json({
			message: 'Incorrect password'
		});
	},

	[resNames.AUTH_INVALID_REFRESH_TOKEN]:  (res) => {
		res.status(401).json({
			errorCode: resNames.AUTH_INVALID_REFRESH_TOKEN,
			message: 'Invalid refresh token'
		});
	},

};



module.exports = { responses, resNames };