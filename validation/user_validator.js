/**
 * User Validation Rules
 */

 const { body } = require('express-validator');
 const models = require('../models');
 
 /**
  * Create User validation rules
  *
  */
  const createRules = [
	body('email').exists().isLength({ min: 3 }).custom(async value => {
		const user = await new models.User({ username: value }).fetch({ require: false });
		if (user) {
			return Promise.reject("Username already exists.");
		}

		return Promise.resolve();
	}),
	body('password').exists().isLength({ min: 4 }),
	body('first_name').exists().isLength({ min: 2 }),
	body('last_name').exists().isLength({ min: 2 }),
];
 
 /**
  * Update User validation rules
  
  * 
  */
 const updateRules = [
     body('last_name').exists().isLength({ min: 4 }),
 ];
 
 module.exports = {
     createRules,
     updateRules,
 }
 