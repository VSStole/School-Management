 
 const express = require('express');
 
 const { body } = require('express-validator');
 
 const router = express.Router();

 const User = require('../models/user');
 
 const authController = require('../controllers/auth');
 
 
/* A middleware that is used to validate the user input. */
 router.post(
   '/signup',
   [
     body('name').trim().not().isEmpty(),
     body('email')
       .isEmail()
       .withMessage('Please enter a valid email.')
       .custom(async (email) => {
         const user = await User.find(email);
         if (user[0].length > 0) {
           return Promise.reject('Email address already exists!');
         }
       })
       .normalizeEmail(),
     body('password').trim().isLength({ min: 7 }),
   ],
   authController.signup
 );
 
/* A post request to the login route. */
 router.post('/login', authController.login);
  //  router.get('/user', authController.user);


 module.exports=router;
 