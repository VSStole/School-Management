
const { validationResult } = require('express-validator');
const bcrypt  = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const userDetails = {
      name: name,
      email: email,
      password: hashedPassword,
    };

    const result = await User.save(userDetails);

    res.status(201).json({ message: 'User registered!' }); 
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

/* A function that is called when the user logs in. */
exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.find(email);

    /* Checking if the user exists in the database. */
    if (user[0].length !== 1) {
      const error = new Error('A user with this name could not be found.');
      error.statusCode = 401;//401:not authenticated
      throw error;
    }

  /* Getting the first user from the array of users. */
    const storedUser = user[[0]];

   /* Comparing the password entered by the user with the password stored in the database. */
    //   const isEqual = await bcrypt.compare(password, storedUser.password);
    //  console.log(isEqual);
    //  if (!isEqual) {
    //    const error = new Error('Wrong password!');
    //    error.statusCode = 401;
    //   throw error;
    //  }
     
    /////////////////////////////////////////////////////////////
 

   /* Creating a token for the user. */
    const token = jwt.sign(
      {
        email: storedUser.email,
        userId: storedUser.password,
      },
      'secretfortoken',
      { expiresIn: '1h' }
    );
    res.status(200).json({ token: token, userId: storedUser.id });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

/* A function that is called when the user logs in. */
// exports.user=async(req,res,next)=>{
//   try{
//     if(req.isLoggedIn){
//       res.status(200).json({
//         isLoggedIn:req.isLoggedIn,
//         userId:req.userId,
//         email:req.email,
//       })
//     }
//   }catch(err){
//     if(!err.statusCode){
//       err.statusCode=500;
//     }
//     next(err);
//   }
// };