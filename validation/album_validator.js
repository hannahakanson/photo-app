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
 
  const addPhotoRules = [
     body('photo_id').exists().bail().custom(async value => {
         const photo = await new models.Photo({ id: value }).fetch({ require: false });
         if (!photo) {
             return Promise.reject(`Photo with ID ${value} does not exist.`);
         }

         return Promise.resolve();
     }),
 ];

 const updateRules = [
    body('title').optional().isLength({ min: 3 }),
];


 module.exports = {
     createRules,
     addPhotoRules,
     updateRules
 }