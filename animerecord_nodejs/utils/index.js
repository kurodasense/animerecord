const jwt = require("jsonwebtoken");
const config = require("../config");
function createJWT() {
  const payload = { user_name: config.USERNAME };
  const token = jwt.sign(payload, "1-1-4-5-1-4");
  return token;
}

function verifyJWT(token) {
  const decoded = jwt.verify(token, "1-1-4-5-1-4");
  if (decoded.user_name === config.USERNAME) return true;
  else return false;
}

module.exports = {
  createJWT,
  verifyJWT,
};
