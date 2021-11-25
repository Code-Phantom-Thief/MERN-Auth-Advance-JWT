const ErrorResponse = require('../utils/errorResponse');

const {
	createRefreshToken,
	createaccesstoken,
	sendRefreshToken,
} = require('../utils/tokens');

const { isAuth } = require('../utils/isAuth');

const REFRESH_TOKEN_SECRET =
	process.env.REFRESH_TOKEN_SECRET;

exports.protected = async (req, res, next) => {
	try {
		const userId = isAuth(req, next);
		if (userId !== null) {
			res.send({
				data: 'This is protected data',
			});
		}
	} catch (error) {
		next(error);
	}
};
