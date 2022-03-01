/**
 * Example Validation Rules
 */

 const { body } = require('express-validator');
 const models = require('../models');
 
 /**
  * Create Example validation rules
  *
  * Required: title
  * Optional: -
  */
 const createRules = [
     body('first_name').exists().isLength({ min: 4 }),
     body('last_name').exists().isLength({min: 4}),
     body('password').exists().isLength({min: 8}),
     body('email').isEmail()
 ];
 
 /**
  * Update Example validation rules
  *
  * Required: -
  * Optional: title
  */
 const updateRules = [
     body('last_name').exists().isLength({ min: 4 }),
 ];
 
 module.exports = {
     createRules,
     updateRules,
 }
 