const Joi = require('joi');

const LoginSchema = Joi.object({
	email: Joi.string()
		.email()
		.lowercase()
		.trim()
		.max(100)
		.required(),
	password: Joi.string().min(6).max(1000).trim().required(),
});

module.exports = LoginSchema;