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



exports.checkUsernameOrEmail = (req, res, next) => {
	
	User.findOne({
		$or: [
			{ username: req.body.usernameOrEmail },
			{ email: req.body.usernameOrEmail },
		]
	})

	.then((user) => {
		if (user) {
			res.locals.user = user;
			next();
		} else {
			responses.userDoesntExist(res);
		}
	})

	.catch(() => {
		responses.generic.dbError(res);
	});
};
