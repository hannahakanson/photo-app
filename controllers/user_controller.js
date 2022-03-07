const models = require('../models');
const debug = require('debug')('photoapp:user_controller');
const bcrypt = require('bcrypt');
const { matchedData, validationResult } = require('express-validator');



/**
 * Register a new user
 *
 * POST /
 */
 const register = async (req, res) => {

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: 'fail', data: errors.array() });
	}

	const validData = matchedData(req);

	try {
		validData.password = await bcrypt.hash(validData.password, 10);

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown when hashing the password.',
		});
		throw error;
	}

	try {
		const user = await new models.User(validData).save();
		debug("Created new user successfully:", user);

		res.send({
			status: 'success',
			data: {
				user,
			},
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when creating a new user.',
		});
		throw error;
	}
}




module.exports = {
	register
};