const bcrypt = require('bcryptjs');

const responses = require('@auth/utils/responses');
const User = require('@auth/models/UserModel');



// const checkUsernameAvailable;

const signupOperation = (req, res, next) => {

	User.create({
		username: req.body.username,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 12),
		name: req.body.name,
		isConfirmed: false,
	})

	.then((user) => {
		res.status(201).json({
			userId: user.id,
			username: user.username,
		});
	})

	.catch(() => {
		responses.generic.dbError(res);
	});

};

module.exports = signupOperation;