const jwt = require('jsonwebtoken');

const User = require('@auth/models/UserModel');
const { createAccessToken, createRefreshToken, addRefreshTokenCookie } = require('@/modules/auth/utils/createTokens');
const { AUTH_INVALID_REFRESH_TOKEN } = require('@/modules/auth/utils/authResponses.js').resNames;


// const checkUsernameAvailable;

const refreshTokenOperation = async (req, res, next) => {

	const refreshToken = req.cookies.refresh;
	try {
		if (!refreshToken) throw new Error();

		let decodedRefreshToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY);
		let userId = decodedRefreshToken.userId;
		let user = await User.findOne({ _id: userId });
		if (!user) throw new Error();

		const accessToken = createAccessToken(user);
		const newRefreshToken = createRefreshToken(user)
		addRefreshTokenCookie(res, newRefreshToken);

		res.status(200).json({ accessToken: ("Bearer " + accessToken), userId });

	} catch (error) {
		console.log("error", error);
		next(AUTH_INVALID_REFRESH_TOKEN);
	}

};


module.exports = refreshTokenOperation;