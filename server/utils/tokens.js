const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

const { sign, verify } = require('jsonwebtoken');

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } =
	process.env;

const createAccesstoken = (userId) => {
	return sign({ userId }, ACCESS_TOKEN_SECRET, {
		expiresIn: '15m',
	});
};

const createRefreshToken = (userId) => {
	return sign({ userId }, REFRESH_TOKEN_SECRET, {
		expiresIn: '7d',
	});
};

const sendAccesstoken = (req, res, accesstoken) => {
	res.send({
		accesstoken,
		email: req.body.email
	})
};

const sendRefreshToken = (res, refreshtoken) => {
	res.cookie('refreshtoken', refreshtoken, {
		httpOnly: true,
		path: '/api/auth/refresh_token',
	});
};

module.exports = {
	createAccesstoken,
	createRefreshToken,
	sendAccesstoken,
	sendRefreshToken,
};
