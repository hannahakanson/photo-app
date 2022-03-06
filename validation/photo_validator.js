/**
 * Photo Validation Rules
 */

 const { body } = require('express-validator');
 const models = require('../models');

 /**
  * Create Photo validation rules
  *
  */
const createRules = [
    body('title').exists().isLength({ min: 4 }),
    body('url').exists(),
    body('comment').optional()
];

 /**
  * Update Photo validation rules
  *
  * 
  */
  const updateRules = [
    body('last_name').exists().isLength({ min: 4 }),
];

module.exports = {
    createRules,
    updateRules,
}

// 