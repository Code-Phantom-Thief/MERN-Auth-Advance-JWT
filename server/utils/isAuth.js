const { verify } = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const isAuth = (req, next) => {
	const authorization = req.headers['authorization'];
	if (!authorization) {
		// throw new Error('You need to login');
		return next(
			new ErrorResponse('You need to login', 401)
		);
	}

	const token = authorization.split(' ')[1];
	const { userId } = verify(token, ACCESS_TOKEN_SECRET);
	return userId;
};

module.exports = { isAuth };
