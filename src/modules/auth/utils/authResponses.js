const resNames = {
	AUTH_USER_EXISTS: "AUTH_USER_EXISTS",
	AUTH_USER_DOESNT_EXIST: "AUTH_USER_DOESNT_EXIST",
	AUTH_USER_NOT_LOGGED: "AUTH_USER_NOT_LOGGED",
	AUTH_REGISTER_ERROR: "AUTH_REGISTER_ERROR",
	AUTH_INCORRECT_PASSWORD: "AUTH_INCORRECT_PASSWORD",
};



const responses = {

	[resNames.AUTH_USER_EXISTS]: (res) => {
		res.status(409).json({
			message: 'This username or email already exists.',
		});
	},

	[resNames.AUTH_USER_DOESNT_EXIST]: (res) => {
		res.status(409).json({
			message: 'This username or email does not exist.',
		});
	},

	[resNames.AUTH_USER_NOT_LOGGED]: (res) => {
		res.status(401).json({
			message: 'The user is not logged or the authorization headers are incorrect',
		})
	},
	
	[resNames.AUTH_REGISTER_ERROR]: (res) => {
		res.status(409).json({
			message: 'The password was changed, but the register was not succesful. Please register again.'
		});
	},

	[resNames.AUTH_INCORRECT_PASSWORD]: (res) => {
		res.status(401).json({
			message: 'Incorrect password'
		});
	}

};



module.exports = { responses, resNames };