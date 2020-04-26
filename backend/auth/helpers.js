const bcrypt = require('bcrypt');

const hashPassword = async (plainPassword) => {
  try {
    let passwordDigest = await bcrypt.hash(plainPassword, 10);
    return passwordDigest;
  }
  catch (err) {
    throw (err)
  }
}

const comparePasswords = (plainPassword, passwordDigest) => {
  return bcrypt.compare(plainPassword, passwordDigest)
}

const loginRequired = (req, res, next) => {
    if (req.user) return next(); // If the user is logged in just call the next middleware
    res.status(401).json({
      payload: {
        message: "Unauthorized - To Access this route you have to be logged in."
      },
      error: true
    })
  }

module.exports = {
    hashPassword,
    comparePasswords,
    loginRequired
}