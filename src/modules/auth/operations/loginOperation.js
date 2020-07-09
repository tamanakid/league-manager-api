const bcrypt = require('bcryptjs');

const { createAccessToken, createRefreshToken, addRefreshTokenCookie } = require('@/modules/auth/utils/createTokens');
const { AUTH_INCORRECT_PASSWORD } = require('@/modules/auth/utils/authResponses').resNames;


const loginOperation = (req, res, next) => {

	const user = res.locals.user;
	const password = req.body.password;

	const isCorrect = bcrypt.compareSync(password, user.password)

	if (isCorrect) {
		const accessToken = createAccessToken(user);
		const refreshToken = createRefreshToken(user)
		addRefreshTokenCookie(res, refreshToken);

		res.status(200).json({ accessToken: ("Bearer " + accessToken), userId: user._id.toString() });
	} else {
		next(AUTH_INCORRECT_PASSWORD);
	}
}



module.exports = loginOperation;