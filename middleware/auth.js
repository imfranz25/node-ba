const jwt = require('jsonwebtoken');
const getcookie = require('../controllers/getcookie');

const config = process.env;

const verifyToken = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'] || getcookie(req).token;

  if (!token) {
    return res.redirect(301, 'login');
  }

  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    res.clearCookie('token');
    res.clearCookie('username');
    return res.redirect(301, 'login');
  }
  return next();
};

module.exports = verifyToken;
