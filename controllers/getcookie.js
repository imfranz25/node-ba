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

module.exports = getcookie;
