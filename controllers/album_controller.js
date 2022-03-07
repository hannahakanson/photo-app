/**
 * Album Controller
 */

 const debug = require('debug')('photoapp:album_controller');
 //const bcrypt = require('bcrypt');  ----behövs inte?
 const { matchedData, validationResult } = require('express-validator');
 const models = require('../models');
 const { Album } = require('../models');

 /**
  * Get all your albums
  *
  * GET path: /albums/
  */

  const read = async (req, res) => {
    await req.user.load('albums');

    res.status(200).send({
        status: 'success',
        data: {
            albums: req.user.related('albums'),
        },
    });
}


 /**
  * Get one album
  *
  * GET path: /albums/:albumId/
  */
    
  
  const singleAlbum = async (req, res) => {

    const single_album = await new models.Album({ id: req.params.albumId })
    .fetch({withRelated:['photos']});

    res.status(200).send({
        status: 'success',
        data: {
            single_album
        },
    });
}

/**
  * Post an album
  *
  * POST path: /albums/
  */

 const create = async (req, res) => {
    // check for any validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({ status: 'fail', data: errors.array() });
    }

    // get only the validated data from the request
    const userID = req.user.id;
    const validData = matchedData(req);

    validData.user_id = userID;

    try {
        const album = await new models.Album(validData).save();
        debug("Created new album successfully: ", album);

        res.send({
            status: 'success',
            data: {
                title: validData.title,
                user_id: validData.user_id

            },
        });

    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Exception thrown in database when creating a new album.',
        });
        throw error;
    }
}


/**
 * Add an existing photo to an album
 *
 * POST path: /albums/:albumId/photos
 */

 const addPhoto = async (req, res) => {
	
    // Check for any validation errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: 'fail', data: errors.array() });
	}

	const validData = matchedData(req);

	// Fetch user and eager-load photo relation
	const album = await new models.Album({ id: req.params.albumId })
    .fetch({withRelated:['photos']});

	const photos = album.related('photos');
	const existing_photo = photos.find(photo => photo.id == validData.photo_id);

	if (existing_photo) {
		return res.send({
			status: 'fail',
			data: 'Photo already exists in the album.',
		});
	}

	try {
		const result = await album.photos().attach(validData.photo_id);
		debug("Added photo to album:", result);

		res.send({
			status: 'success',
			data: null,
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when adding photo album.',
		});
		throw error;
	}
}
 

module.exports = {
    read,
    singleAlbum,
    create,
    addPhoto,
}