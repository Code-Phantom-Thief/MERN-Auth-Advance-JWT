const router = require('express').Router();

const {
	register,
	login,
	logout,
	refresh_token
} = require('../controllers/authController');

const Validator = require('../middlewares/Validator');

router.post('/register', Validator('register'), register);
router.post('/login', Validator('login'), login);
router.post('/logout', logout);
router.post('/refresh_token', refresh_token);

module.exports = router;
