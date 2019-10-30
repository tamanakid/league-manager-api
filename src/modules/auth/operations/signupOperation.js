var bcrypt = require('bcryptjs');
const User = require('@auth/models/UserModel');
const checkUserExistsService = require('@auth/services/checkUserExistsService');


// const checkUsernameAvailable;

const signupOperation = (req, res, next) => {
	checkUserExistsService.checkUsernameAndEmail(req).then((userExists) => {
		if (!userExists) {

			User.create({
				username: req.body.username,
				email: req.body.email,
				password: bcrypt.hashSync(req.body.password, 12),
				name: req.body.name,
				isConfirmed: false,
			})
			.then((user) => {
				res.status(200).send({
					userId: user.id,
					username: user.username,
				});
			});
		} else {
			res.status(409).send({
				message: 'This user/email already exists',
			});
		}
	});
};

module.exports = signupOperation;