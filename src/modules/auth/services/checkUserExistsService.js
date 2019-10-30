const User = require('@auth/models/UserModel');

exports.checkUsernameAndEmail = (req) => {
	return new Promise((resolve, reject) => {
		User.findOne({
			$or: [
				{ username: req.body.username },
				{ email: req.body.email },
			]
		})
		.then((user) => {
			resolve(!!user);
		});
	});
};


exports.checkUsername = (req) => {
	return new Promise((resolve, reject) => {
		return User.findOne({
			username: req.body.username
		})
		.then((user) => {
			resolve(!!user);
		});
	});
};