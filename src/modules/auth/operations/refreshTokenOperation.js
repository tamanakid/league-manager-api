const jwt = require('jsonwebtoken');

const User = require('@auth/models/UserModel');
const { createAccessToken } = require('@/modules/auth/utils/createTokens');
const { GLOBAL_DB_ERROR } = require('@/utils/globalResponses').resNames;
const { AUTH_INVALID_REFRESH_TOKEN } = require('@/modules/auth/utils/authResponses.js').resNames;


// const checkUsernameAvailable;

const refreshTokenOperation = async (req, res, next) => {

	const refreshToken = req.cookies.refresh;
	try {
		if (!refreshToken) throw new Error();

		let decodedRefreshToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY);
		let user = await User.findOne({ _id: decodedRefreshToken.userId });
		if (!user) throw new Error();

		accessToken = createAccessToken(user);
		res.status(200).json({ accessToken })

	} catch (error) {
		console.log("error", error);
		next(AUTH_INVALID_REFRESH_TOKEN);
	}

};


module.exports = refreshTokenOperation;