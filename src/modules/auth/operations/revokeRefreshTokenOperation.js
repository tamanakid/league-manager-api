const jwt = require('jsonwebtoken');

const User = require('@auth/models/UserModel');
const { GLOBAL_DB_ERROR } = require('@/utils/globalResponses').resNames;
const { AUTH_INVALID_REFRESH_TOKEN } = require('@/modules/auth/utils/authResponses.js').resNames;



const revokeRefreshTokenOperation = async (req, res, next) => {

	const userId = req.params.userId;

	try {
		let user = await User.findOne({ _id: userId });
		if (!user) next(AUTH_USER_DOESNT_EXIST);

		user.update({ $inc: { tokenVersion: 1 } });

		res.status(200).json({ revoked: true })

	} catch (error) {
		next(GLOBAL_DB_ERROR);
	}

};


module.exports = revokeRefreshTokenOperation;