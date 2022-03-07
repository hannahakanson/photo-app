/**
 * Authentication Middleware
 */

 const bcrypt = require('bcrypt');
 const debug = require('debug')('photoapp:auth');
 const { User } = require('../models');
 
 /**
  * HTTP Basic Authentication
  */
 const basic = async (req, res, next) => {
     debug("Debugger - auth.basic");
 
     if (!req.headers.authorization) {
         debug("Authorization header is missing");
 
         return res.status(401).send({
             status: 'fail',
             data: 'Authorization required',
         });
     }
 
     debug("Authorization header: ", req.headers.authorization);
 
     const [authSchema, base64Payload] = req.headers.authorization.split(' ');
 
     if (authSchema.toLowerCase() !== "basic") {
         debug("Authorization schema isn't basic");
 
         return res.status(401).send({
             status: 'fail',
             data: 'Authorization required',
         });
     }
 
     const decodedPayload = Buffer.from(base64Payload, 'base64').toString('ascii');

     const [email, password] = decodedPayload.split(':');
 
     // Find user based on email 
     const user = await new User({ email }).fetch({ require: false });
     if (!user) {
         return res.status(401).send({
             status: 'fail',
             data: 'Authorization failed',
         });
     }
     const hash = user.get('password');
 
     // Hash the incoming password and compare if the generated hash matches the db-hash
     const result = await bcrypt.compare(password, hash);
     if (!result) {
         return res.status(401).send({
             status: 'fail',
             data: 'Authorization failed',
         });
     }
 
     // Attach user to request
     req.user = user;
 
     // Pass request along
     next();
 }
 
 module.exports = {
     basic,
 }