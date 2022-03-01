const models = require('../models');
const debug = require('debug')('photoapp:photo_controller');
const bcrypt = require('bcrypt');
const { matchedData, validationResult } = require('express-validator');

/**
 * Get all photos
 *
 * GET /
 */
const read = async (req, res) => {
	const all_Photos = await models.Photo.fetchAll();

	res.send({
		status: 'success',
		data: {
            photos: all_Photos,
        },
	});
}

/**
 * Get one photo
 *
 * GET /
 */

 const show = async (req, res) => {
	const photo = await new models.Photo({ id: req.params.photoId }).fetch();

	res.send({
		status: 'success',
		data: {
			photo,
		}
	});
}

module.exports = {
    read,
    show
};