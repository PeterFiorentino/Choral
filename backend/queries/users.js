const db = require('../db/db')
const authHelpers = require("../auth/helpers");

const createUser = async (user) => {
  const passwordDigest = await authHelpers.hashPassword(user.password);

  const insertUserQuery = `
      INSERT INTO users (username, password, email, avatar) 
        VALUES ($/username/, $/password/, $/email/, $/avatar/)
        RETURNING *
    `

  const newUser = await db.one(insertUserQuery, {
    username: user.username,
    password: passwordDigest,
    email: user.email,
    avatar: user.avatar
  })

  delete newUser.password_digest // Do not return the password_digest and accidentally expose it
  return newUser
}

const getAllUsers = async () => {
    const users = await db.any("SELECT * FROM users")
    return users;
  }

  const getUserByUsername = async (username) => {
    console.log('getting user...', username)
	const user = await db.oneOrNone("SELECT * FROM users WHERE username = $1", [username])
	return user;
}
  module.exports = { 
      createUser,
      getUserByUsername,
      getAllUsers
  }
