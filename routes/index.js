const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

/* GET / */
router.get('/', (req, res, next) => {
	res.send({ success: true, data: { msg: 'oh, hi' }});
});

router.use('/register', require('./user_route'));

router.use('/photo', auth.basic, require('./photo_route'));

module.exports = router;
