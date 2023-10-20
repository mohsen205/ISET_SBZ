const bcrypt = require("bcrypt");

const comparePassword = async (password, hashedPassword) => {
  try {
    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    return passwordMatch;
  } catch (error) {
    throw new Error("Error comparing passwords");
  }
};

module.exports = { comparePassword };
