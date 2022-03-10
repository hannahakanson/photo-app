/**
 * Album Validation Rules
 */

 const { body } = require('express-validator');

 /**
  * Create album
  */
 const createRules = [
     body('title').exists().isLength({ min: 3 }),
     body('user_id').optional().isInt(),
 ];

 /**
  * Add photo to album
  */
 
  const addPhotoRules = [
     body('photo_id').exists().isInt(),
 ];

  /**
  * Update album
  */

 const updateRules = [
    body('title').optional().isLength({ min: 3 }),
];


 module.exports = {
     createRules,
     addPhotoRules,
     updateRules
 }