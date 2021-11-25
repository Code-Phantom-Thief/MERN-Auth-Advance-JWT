const User = require('../models/User');
const {
	createAccesstoken,
	createRefreshToken,
	sendAccesstoken,
	sendRefreshToken,
} = require('../utils/tokens');

const ErrorResponse = require('../utils/errorResponse');
const { verify } = require('jsonwebtoken');

const REFRESH_TOKEN_SECRET =
	process.env.REFRESH_TOKEN_SECRET;

exports.register = async (req, res, next) => {
	const { username, email, password } = req.body;
	try {
		const existUser = await User.findOne({ email });

		if (existUser) {
			return next(
				new ErrorResponse(
					'You are already registerd. Please login',
					400
				)
			);
		}

		const newUser = new User({
			username,
			email,
			password,
		});

		await newUser.save();

		return res
			.status(200)
			.json({ message: 'User registered successfully!!!' });
	} catch (error) {
		next(error);
	}
};

exports.login = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return next(
				new ErrorResponse('Email does not match', 400)
			);
		}

		const valid = await user.comparePassword(password);
		if (!valid) {
			return next(
				new ErrorResponse('Password does not match', 400)
			);
		}

		const accesstoken = createAccesstoken(user.id);
		const refreshtoken = createRefreshToken(user.id);

		user.refreshtoken = refreshtoken;
		await user.save();

		sendRefreshToken(res, refreshtoken);
		sendAccesstoken(req, res, accesstoken);
	} catch (error) {
		next(error);
	}
};

exports.logout = (_req, res) => {
	res.clearCookie('refreshtoken', {
		path: '/api/auth/refresh_token',
	});
	return res.send({
		message: 'Logged out',
	});
};

exports.refresh_token = async (req, res, next) => {
	const token = req.cookies.refreshtoken;
	if (!token) {
		return res.send({
			accesstoken: '',
			message: 'not token',
		});
	}

	let payload = null;

	try {
		payload = verify(token, REFRESH_TOKEN_SECRET);

		const user = await User.findById(payload.userId);

		if (!user) {
			return res.send({
				accesstoken: '',
				message: 'User not exist',
			});
		}

		if (user.refreshtoken !== token) {
			return res.send({
				accesstoken: '',
				message: 'Token invalid',
			});
		}

		const accesstoken = createAccesstoken(user.id);
		const refreshtoken = createRefreshToken(user.id);

		user.refreshtoken = refreshtoken;

		await user.save();

		sendRefreshToken(res, refreshtoken);
		return res.send({ accesstoken });
	} catch (error) {
		return res.send({
			accesstoken: '',
			message: error.message,
		});
	}
};
