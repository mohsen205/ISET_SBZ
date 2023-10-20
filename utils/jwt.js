const jwt = require("jsonwebtoken");

const secretKey =
  "63b32993-7c05-4574-8f86-d4a6e48f1713457b94565f276c2466b53e677790";

const createJWT = ({ data }) => {
  try {
    const token = jwt.sign(data, secretKey);
    return token;
  } catch (error) {
    return null;
  }
};

const verifyJWT = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    return null;
  }
};

module.exports = {
  createJWT,
  verifyJWT,
};
