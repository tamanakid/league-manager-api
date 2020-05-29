const jwt = require('jsonwebtoken');

const User = require('@auth/models/UserModel');
const responses = require('@auth/utils/responses');


exports.verifyUserLoggedService = (req, res, next) => {
	const authHeader = req.get('Authorization');

	if (!authHeader) {
		responses.userNotLogged(res);
	}

	let decodedKey;
	try {
		decodedKey = jwt.verify(authHeader, process.env.JWT_KEY);
	} catch (error) {
		next(error);
	}
	
	if (!decodedKey) {
		responses.userNotLogged(res);
	} else {

		const userId = decodedKey.userId;
		User.findById(userId).then((user) => {
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
	}

}