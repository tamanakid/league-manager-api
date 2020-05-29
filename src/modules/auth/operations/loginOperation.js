const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const responses = require('@auth/utils/responses');


const loginOperation = (req, res, next) => {

	const user = res.locals.user;
	const password = req.body.password;

	const isCorrect = bcrypt.compareSync(password, user.password)

	if (isCorrect) {
		const token = jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_KEY, { expiresIn: '1h' });
		res.status(200).json({ token: token, userId: user._id.toString() });
	} else {
		responses.incorrectPassword(res);
	}
}



module.exports = loginOperation;