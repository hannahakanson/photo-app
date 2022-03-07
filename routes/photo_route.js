const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photo_controller');
const photoValidationRules = require('../validation/photo_validator');

//** GET */
/* Get all your own photos 
Path: /photos/ */
router.get('/', photoController.read);

/* Get a specific photo 
path: /photos/:photoId */
router.get('/:photoId', photoController.singlePhoto);


//** POST */
/* Post a new photo 
Path: /photos */
router.post('/', photoValidationRules.createRules, photoController.create);

//** PUT */
/* Update a specific photo 
Path: /photos/:photoId */
//router.put('/:photoId', photoValidationRules.updateRules, photoController.update);


module.exports = router;
