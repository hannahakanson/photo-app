const models = require('../models');
const debug = require('debug')('photoapp:photo_controller');
const bcrypt = require('bcrypt');
const { matchedData, validationResult } = require('express-validator');
const { ResultWithContext } = require('express-validator/src/chain');

/**
 * Get all photos
 *
 * GET /
 */
const read = async (req, res) => {
	await req.user.load('photos');

	res.status(200).send({
		status: 'success',
		data: {
            photos: req.user.related('photos')
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


/**
 * Get authenticated user's photos
 *
 * GET /photos
 */
//  const getPhotos = async (req, res) => {
// 	// get user and also eager-load the photo-relation
// 	const user = await new models.User({ id: req.user.id })
//     .fetch({ withRelated: ['photos'] });

// 	// "lazy load" the photo-relation
// 	await req.user.load('photos');

// 	res.status(200).send({
// 		status: 'success',
// 		data: {
// 			photos: req.user.related('photos'),
// 		},
// 	});
// }


/**
 * Post new photo
 *
 * POST /
 */

const create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({status: "fail", data: errors.array()});
    } 

    //säkerställa att vi bara tar in den information vi vill (title, url, comment)
    const validData = matchedData(req);

try {
    const photo = await new models.Photo(validData).save();
    debug("Created new photo successfully: %O", book);

    res.send({
        status: 'success',
        data: {
            photo,
        },
    });

} catch (error) {
    res.status(500).send({
        status: 'error',
        message: 'Exception thrown in database when creating a new photo.',
    });
    throw error;
}
}



module.exports = {
    read,
    show,
    create,
};