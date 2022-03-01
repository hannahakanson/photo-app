const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const userValidationRules = require('../validation/user_validator');

/* Get all resources */
router.get('/', userController.read);

// /* Get a specific resource */
// router.get('/:exampleId', exampleController.show);

// /* Store a new resource */
router.post('/', userValidationRules.createRules, userController.register);

// /* Update a specific resource */
// router.put('/:exampleId', exampleValidationRules.updateRules, exampleController.update);

// /* Destroy a specific resource */
// router.delete('/:exampleId', exampleController.destroy);

module.exports = router;
