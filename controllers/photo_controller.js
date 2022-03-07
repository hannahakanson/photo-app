const models = require('../models');
const debug = require('debug')('photoapp:photo_controller');
//const bcrypt = require('bcrypt'); ---- behövs inte?
const { matchedData, validationResult } = require('express-validator');





//** Get all photos
/*
 GET /
*/

const read = async (req, res) => {
  await req.user.load('photos');

  res.status(200).send({
      status: 'success',
      data: {
          photos: req.user.related('photos'),
      },
  });
}



//** Get single photo
/*
 GET /
*/

 const singlePhoto = async (req, res) => {
      await req.user.load('photos');

      const chosen_photo = await new models.Photo({ id: req.params.photoId })
      .fetch();
      
      const related_photos= req.user.related('photos');

      existing_photo = related_photos.find(photo => photo.id == chosen_photo.id);

      res.status(200).send({
          status: 'success',
          data: {
              existing_photo,
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


  const userID = req.user.id;
  const validData = matchedData(req);
  validData.user_id = userID;

  try {
      const photo = await new models.Photo(validData).save();
      debug("Created new photo successfully: ", photo);

      console.log('Your beautiful photo'+photo);

      res.send({
          status: 'success',
          data: {
              title: validData.title,
              url: validData.url,
              comment: validData.comment,
              user_id: validData.user_id

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