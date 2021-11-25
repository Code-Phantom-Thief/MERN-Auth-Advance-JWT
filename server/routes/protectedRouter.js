const router = require('express').Router();
const {
	protected,
} = require('../controllers/protectedController');

router.post('/', protected);

module.exports = router;