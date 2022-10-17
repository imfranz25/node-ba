const deleteCookie = (req, res, next) => {
  res.clearCookie('token');
  res.clearCookie('username');
  return next();
};

module.exports = deleteCookie;
