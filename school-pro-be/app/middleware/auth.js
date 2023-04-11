const jwt = require('jsonwebtoken');

/* This is a middleware function that checks if the user is authenticated. */
module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const error = new Error('Not authenticated!');
    error.statusCode = 401;
    throw error;
  }
  /* The token is stored in the Authorization header. The header is a string that looks like this:
  `Bearer <token>`. The split method splits the string into an array of strings. The first element
  is `Bearer` and the second element is the token. The token is stored in the second element of the
  array. */
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    // jwt.verify both decodes and verifies the token and is validated with the secret
    decodedToken = jwt.verify(token, 'secretfortoken');
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  // check if token unverified i.e. undefined
  /* This is a middleware function that checks if the user is authenticated. */
  if (!decodedToken) {
    const error = new Error('Not authenticated!');
    error.statusCode = 401;
    throw error;
  }
  /* This is adding the userId and email to the request object. */
  req.isLoggedIn = true;
  req.userId = decodedToken.userId;
  req.email = decodedToken.email;
  next();
};