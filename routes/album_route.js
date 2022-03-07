const express = require('express');
const router = express.Router();
const albumController = require('../controllers/album_controller');
const albumValidationRules = require('../validation/album_validator');


//** GET */
/* Get all your albums
Path: /albums/ */
router.get('/', albumController.read);

/* Get a specific album 
Path: /albums/:albumId */
router.get('/:albumId', albumController.singleAlbum);


//** POST */
/* Post a new album
Path: /albums/ */
router.post('/', albumValidationRules.createRules, albumController.create);

/* Post a new single photo in an album 
Path: /albums/:albumId/photos */
router.post('/:albumId/photos', albumValidationRules.addPhotoRules, albumController.addPhoto);

//** PUT */
/* Update an album
Path: /albums/:albumId */
//router.put('/:albumId/', albumValidationRules.updateRules, albumController.update);

module.exports = router;