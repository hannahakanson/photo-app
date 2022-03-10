/**
 * Photo Validation Rules
 */

 const { body } = require('express-validator');
 const models = require('../models');



 /**
  * Create photo 
  */

const createRules = [
    body('title').exists().isLength({ min: 3 }),
    body('url').exists().isURL().isLength({ min: 3 }),
    body('comment').exists().isLength({ min: 3 })
];


 /**
  * Update Photo
  */
  const updateRules = [
    body('title').optional().isLength({ min: 4 }),
    body('url').optional().isURL().isLength({ min: 3 }),
    body('comment').optional().isLength({ min: 3 })
];



module.exports = {
    createRules,
    updateRules,
}
