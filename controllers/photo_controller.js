const models = require('../models');
const debug = require('debug')('photoapp:photo_controller');
const { matchedData, validationResult } = require('express-validator');





//** Get all photos
/*
 GET /
*/

const read = async (req, res) => {

    user_id = req.user.id;
 
    const allPhotos = await new models.Photo().where({ user_id: user_id}).fetchAll({ columns: ['id', 'title', 'url', 'comment']})

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

 const singlePhoto = async (req, res) => {
      await req.user.load('photos');
      user_id = req.user.id;

      const chosenPhoto = await new models.Photo().where({ id: req.params.photoId }).fetchAll({ columns: ['id', 'title', 'url', 'comment']})

      const existingPhoto = req.user.related('photos').find(photo => photo.id == chosenPhoto.id);

      res.status(200).send({
          status: 'success',
          data: {
              existingPhoto
          },
      });
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


  //const userID = req.user.id;
  const validData = matchedData(req);
  //validData.user_id = userID;

  try {
      const photo = await new models.Photo(validData).save();
      debug("Created new photo successfully: ", photo);

      console.log('Your beautiful photo'+ photo);

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




module.exports = {
  read,
  singlePhoto,
  create
};