/**
 * Photo Validation Rules
 */

 const { body } = require('express-validator');
 const models = require('../models');

 /**
  * Create User validation rules
  *
  */
//   const createRules = [
//     body('first_name').exists().isLength({ min: 4 }),
//     body('last_name').exists().isLength({min: 4}),
//     body('password').exists().isLength({min: 8}),
//     body('email').isEmail()
// ];