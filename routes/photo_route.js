const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photo_controller');
const photoValidationRules = require('../validation/photo_validator');

/* Get all resources */
router.get('/', photoController.read);

/* Get a specific photo */
router.get('/:photoId', photoController.show);

// /* Store a new resource */
//router.post('/', photoValidationRules.createRules, photoController.register);

// /* Update a specific resource */
// router.put('/:exampleId', exampleValidationRules.updateRules, exampleController.update);

// /* Destroy a specific resource */
// router.delete('/:exampleId', exampleController.destroy);

module.exports = router;
