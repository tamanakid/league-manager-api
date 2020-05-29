const bcrypt = require('bcryptjs');

const User = require('@auth/models/UserModel');
const { GLOBAL_DB_ERROR } = require('@/utils/globalResponses').resNames;



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
		next(GLOBAL_DB_ERROR);
	});

};

module.exports = signupOperation;