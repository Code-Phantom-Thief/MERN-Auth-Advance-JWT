const Joi = require('joi');

const RegisterSchema = Joi.object({
	username: Joi.string().max(50).trim().required(),
	email: Joi.string()
		.email()
		.lowercase()
		.trim()
		.max(100)
		.required(),
	password: Joi.string().min(6).max(1000).trim().required(),
});

module.exports = RegisterSchema;
