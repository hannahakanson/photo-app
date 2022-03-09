/**
 * Photo Controller
 */

const models = require('../models');
const debug = require('debug')('photoapp:photo_controller');
const { matchedData, validationResult } = require('express-validator');



//** Get all photos
/*
 GET /
*/

const read = async (req, res) => {

    user_id = req.user.id;
 
    const allPhotos = await new models.Photo().where({ user_id: user_id})
    .fetchAll({ columns: ['id', 'title', 'url', 'comment']})

    res.status(200).send({
      status: 'success',
      data: {
          photos: allPhotos,
      },
  });
}





//** Get single photo
/*
 GET /
*/

const show = async (req, res) => {
    
    user_id = req.user.id,
    photo_id = req.params.photoId;

    const chosenPhoto = await new models.Photo().where( {user_id: user_id, id: photo_id }).fetchAll({columns: ['id', 'title', 'url', 'comment']});

    if(chosenPhoto.isEmpty()) {
        res.status(404).send({
            status: 'error',
            message: 'Photo was not found'
        })
    } else {
        res.status(200).send({
        status: 'success',
        data: chosenPhoto,
    });
    }

}


//** Post a photo
/*
 POST /
*/

const create = async (req, res) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(422).send({ status: 'fail', data: errors.array() });
  }


  const validData = matchedData(req);
  validData.user_id = req.user.id;

  try {
      const photo = await new models.Photo(validData).save();
      debug("Created new photo successfully: ", photo);

      res.send({
          status: 'success',
          data: {
            photo
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


//** Update a photo
/*
 PUT /
*/

const update = async (req, res) => {
    //Check for validation errors
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
       return res.status(422).send({ status: 'fail', data: errors.array() });
   }

    // Load the auth users photos
   await req.user.load('photos');

   const userPhotos = req.user.related('photos');

   // Check if the photo belongs to the user
   const userPhoto = userPhotos.find(photo => photo.id == req.params.photoId);
   const photo = await new models.Photo({ id: req.params.photoId }).fetch();

   const validData = matchedData(req);

   // Return fail message if it doesn't belong to the user
   if (!userPhoto) {
       return res.send({
           status: 'fail',
           data: 'Photo does not belong to this user.',
       });
   }

   try {
       // Save the updated photo
       const updatedPhoto = await photo.save(validData);
       debug("Updated album successfully: %O", updatedPhoto);

       res.status(200).send({
           status: 'success',
           data: {
               updatedPhoto
           },
       });

   } catch (error) {
       res.status(500).send({
           status: 'error',
           message: 'Exception thrown in database when updating photo.',
       });
       throw error;
   }
}



module.exports = {
  read,
  show,
  create,
  update
};