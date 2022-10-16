const deleteCookie = (req, res, next) => {
  res.clearCookie('token');
  res.clearCookie('id');
  return next();
};

module.exports = deleteCookie;
