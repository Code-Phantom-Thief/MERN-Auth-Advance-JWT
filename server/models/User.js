const mongoose = require('mongoose');
const { compare, hash } = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		maxlength: 50,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		maxlength: 100,
		trim: true,
		unique: true,
		lowercase: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
		maxlength: 1000,
		trim: true,
	},
	refreshtoken: {
		type: String,
		trim: true,
	},
});

UserSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next();
	}
	this.password = await hash(this.password, 12);
	next();
});

UserSchema.methods.comparePassword = async function (
	enterdPassword
) {
	return await compare(enterdPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
