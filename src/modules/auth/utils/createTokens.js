const jwt = require('jsonwebtoken');


exports.createAccessToken = (user) => {
	return jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_ACCESS_KEY, { expiresIn: '30m' });
};


exports.createRefreshToken = (user) => {
	return jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_REFRESH_KEY, { expiresIn: '1d' });
};


exports.addRefreshTokenCookie = (res, refreshToken) => {
	res.cookie("refresh", refreshToken, {
		httpOnly: true,
		path: "/api/auth/refresh-token"
	});
};