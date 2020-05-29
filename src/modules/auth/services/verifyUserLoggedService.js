const jwt = require('jsonwebtoken');

const User = require('@auth/models/UserModel');
const { GLOBAL_SERVER_ERROR, GLOBAL_DB_ERROR } = require('@/utils/globalResponses').resNames;
const { AUTH_USER_DOESNT_EXIST, AUTH_USER_NOT_LOGGED } = require('@auth/utils/authResponses').resNames;



exports.verifyUserLoggedService = (req, res, next) => {
	const authHeader = req.get('Authorization');

	if (!authHeader) {
		responses.userNotLogged(res);
	}

	let decodedKey;
	try {
		decodedKey = jwt.verify(authHeader, process.env.JWT_KEY);
	} catch (error) {
		next(GLOBAL_SERVER_ERROR);
	}
	
	if (!decodedKey) {
		next(AUTH_USER_NOT_LOGGED);
	} else {

		const userId = decodedKey.userId;
		User.findById(userId).then((user) => {
			if (user) {
				res.locals.user = user;
				next();
			} else {
				next(AUTH_USER_DOESNT_EXIST);
			}
		})
		.catch(() => {
			next(GLOBAL_DB_ERROR)
		});
	}

}