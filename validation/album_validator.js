/**
 * Album Validation Rules
 */

 const { body } = require('express-validator');
 const models = require('../models');

 
 /**
  * Create album validation rules
  */
 const createRules = [
     body('title').exists().isLength({ min: 3 }),
     body('user_id').optional().isInt(),
 ];

 /**
  * Add photo to album validation rules
  */
 
  const addPhotoRules = [
     body('photo_id').exists().isInt(),
 ];

 const updateRules = [
    body('title').optional().isLength({ min: 3 }),
];


 module.exports = {
     createRules,
     addPhotoRules,
     updateRules
 }