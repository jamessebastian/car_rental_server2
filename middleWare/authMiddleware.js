const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');   //needs to be worked on from client side...
  if (!token) {
    return res.status(400).json({ msg: 'No token, authorization denied' });
  }

  //verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'token is not valid' });
  }
};