const User = require('@auth/models/UserModel');
const responses = require('@auth/utils/responses');



exports.checkUsernameAndEmail = (req, res, next) => {

	User.findOne({
		$or: [
			{ username: req.body.username },
			{ email: req.body.email },
		]
	})

	.then((user) => {
		if (!user) {
			next();
		} else {
			responses.userAlreadyExists(res);
		}
	})
	
	.catch(() => {
		responses.generic.dbError(res);
	});
};



exports.checkUsername = (req, res, next) => {
	
	User.findOne({
		username: req.body.username
	})

	.then((user) => {
		if (!user) {
			next();
		} else {
			responses.userAlreadyExists(res);
		}
	})

	.catch(() => {
		responses.generic.dbError(res);
	});
};
