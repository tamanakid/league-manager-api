const genericResponses = require('@/utils/responses');


module.exports = {
	generic: genericResponses,

	userAlreadyExists: (res) => {
		res.status(409).send({
			message: 'This username or email already exist.',
		});
	},
	
	registerError: (res) => {
		res.status(409).send({
			message: 'The password was changed, but the register was not succesful. Please register again.'
		});
	},

	incorrectPassword: (res) => {
		res.status(401).send({
			message: 'Incorrect password'
		});
	}

};