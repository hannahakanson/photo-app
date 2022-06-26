/**
 * Album Controller
 */

 const debug = require('debug')('photoapp:album_controller');
 const { matchedData, validationResult } = require('express-validator');
 const models = require('../models');

  // Save the valid data
  const validData = matchedData(req);


//** Get all albums
 /**
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

//** Get one album
 /**
  * GET path: /albums/:albumId/
  */

const show = async (req, res) => {

    album_id = req.params.albumId;
    user_id = req.user.id;

    // Get the user
    const user = await models.User.fetchById(user_id, { withRelated: ['albums'] });

    // Get the users albums
    const albums = user.related('albums').find(album => album.id == req.params.albumId);

    if (!albums) {
        return res.status(404).send({
            status: 'fail',
            data: 'Album not found.',
        });

    }
    const chosenAlbum = await models.Album.fetchById(album_id, { withRelated: ['photos'], columns: ['id', 'title'] });

    res.status(200).send({
        status: 'success',
        data: chosenAlbum
    })
}


//** Post new album
/**
  * POST path: /albums/
  */

 const create = async (req, res) => {
    
    // Check for validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).send({ status: 'fail', data: errors.array() });
    }

    // Validated data
    const validData = matchedData(req);
    validData.user_id = req.user.id;

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


//** Add photo to album
/**
 *
 * POST path: /albums/:albumId/photos
 */

 const addPhoto = async (req, res) => {
	
    // Check for validation errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: 'fail', data: errors.array() });
	}

    // Load the auth users albums
   await req.user.load('albums');

   const userAlbums = req.user.related('albums');

   // Check if the album belongs to the user
   const userAlbum = userAlbums.find(album => album.id == req.params.albumId);

   // Return fail message if album doesn't belong to the user/does not exist
   if (!userAlbum) {
    return res.status(404).send({
                status: 'fail',
                data: 'Album does not belong to this user.',
            });
    }

     // Load the auth users photos
   await req.user.load('photos');

   const userPhotos = req.user.related('photos');

   // Check if the photo belongs to the user
   const userPhoto = userPhotos.find(photo => photo.id == validData.photo_id);

   // Return fail message if photo doesn't belong to the user/does not exist
   if (!userPhoto) {
    return res.status(404).send({
                status: 'fail',
                data: 'Photo does not belong to this user.',
            });
    }

    const album = await new models.Album({ id: req.params.albumId }).fetch({withRelated:['photos']});

    // Get the photos of the album
	const photos = album.related('photos');

    //Look for the photo in the album 
	const photo = photos.find(photo => photo.id == validData.photo_id);

    //Return fail message if the photo exists
	if (photo) {
		return res.send({
			status: 'fail',
			data: 'Photo already exists in the album.',
		});
	}

	try {
        //Add the photo to the album
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



//** Update an album
/*
 PUT /
*/
const update = async (req, res) => {
	// Check for validation errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: 'fail', data: errors.array() });
	}

    // Load the auth users albums
   await req.user.load('albums');

   const userAlbums = req.user.related('albums');

   // Check if the album belongs to the user
   const userAlbum = userAlbums.find(album => album.id == req.params.albumId);

   // Return fail message if album doesn't belong to the user/does not exist
   if (!userAlbum) {
    return res.status(404).send({
                status: 'fail',
                data: 'Album does not belong to this user.',
            });
    }
    const validData = matchedData(req);
    const album = await new models.Album({ id: req.params.albumId }).fetch();

	try {
		const updatedAlbum = await album.save(validData);
		debug("Updated album successfully: %O", updatedAlbum);

		res.send({
			status: 'success',
			data: {
				album,
			},
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when updating album.',
		});
		throw error;
	}
}


 

module.exports = {
    read,
    show,
    create,
    addPhoto,
    update
}