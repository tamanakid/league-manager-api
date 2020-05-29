const genericResponses = require('@/utils/responses');


module.exports = {
	generic: genericResponses,

	userAlreadyExists: (res) => {
		res.status(409).json({
			message: 'This username or email already exists.',
		});
	},

	userDoesntExist: (res) => {
		res.status(409).json({
			message: 'This username or email does not exist.',
		});
	},

	userNotLogged: (res) => {
		res.status(401).json({
			message: 'The user is not logged or the authorization headers are incorrect',
		})
	},
	
	registerError: (res) => {
		res.status(409).json({
			message: 'The password was changed, but the register was not succesful. Please register again.'
		});
	},

	incorrectPassword: (res) => {
		res.status(401).json({
			message: 'Incorrect password'
		});
	}

};