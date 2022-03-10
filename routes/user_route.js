/**
 * User Route
 */

const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const userValidationRules = require('../validation/user_validator');

//** POST */
/* Register a new user
Path: /register/ */
router.post('/', userValidationRules.createRules, userController.register);


module.exports = router;
