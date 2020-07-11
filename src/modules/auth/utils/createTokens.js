const jwt = require('jsonwebtoken');


exports.createAccessToken = (user) => {
	return jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_ACCESS_KEY, { expiresIn: '1m' }); // 15m
};


exports.createRefreshToken = (user) => {
	return jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_REFRESH_KEY, { expiresIn: '3m' }); // 1d
};


exports.addRefreshTokenCookie = (res, refreshToken) => {
	res.cookie("refresh", refreshToken, {
		domain: '127.0.0.1',
		httpOnly: true,
		path: "/api/auth/refresh-token",
		// maxAge: 86400000,
		maxAge: 180000,
	});
};