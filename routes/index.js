const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

/* GET / */
router.get('/', (req, res, next) => {
	res.send({ success: true, data: { msg: 'WELCOME! 🥳' }});
});

//paths for routes
router.use('/register', require('./user_route'));
router.use('/photos', auth.basic, require('./photo_route'));
router.use('/albums', auth.basic, require('./album_route'));

module.exports = router;
