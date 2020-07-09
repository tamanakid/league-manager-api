const User = require('@auth/models/UserModel');
const { GLOBAL_DB_ERROR } = require('@/utils/globalResponses').resNames;
const { AUTH_USER_EXISTS, AUTH_USER_DOESNT_EXIST } = require('@auth/utils/authResponses').resNames;



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
			next(AUTH_USER_EXISTS);
		}
	})
	
	.catch(() => {
		next(GLOBAL_DB_ERROR);
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
			next(AUTH_USER_DOESNT_EXIST);
		}
	})

	.catch(() => {
		next(GLOBAL_DB_ERROR);
	});
};
