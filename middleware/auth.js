const jwt = require('jsonwebtoken');

const config = process.env;

/**
 * Description
 * @param {object} req
 * @returns {array}
 */

function getcookie(req) {
  const { headers: { cookie } } = req;
  try {
    return cookie.split(';').reduce((res, item) => {
      const data = item.trim().split('=');
      return { ...res, [data[0]]: data[1] };
    }, {});
  } catch {
    return false;
  }
}

const verifyToken = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'] || getcookie(req).token;

  if (!token) {
    return res.redirect('login');
  }

  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.redirect('login');
  }
  return next();
};

module.exports = verifyToken;
