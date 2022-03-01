const express = require('express');
const router = express.Router();

/* GET / */
router.get('/', (req, res, next) => {
	res.send({ success: true, data: { msg: 'oh, hi' }});
});

router.use('/register', require('./user_route'));

router.use('/photo', require('./photo_route'));

module.exports = router;
