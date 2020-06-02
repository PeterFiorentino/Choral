const db = require('../db/db')
const authHelpers = require("../auth/helpers");

const createUser = async (user) => {
  const passwordDigest = await authHelpers.hashPassword(user.password);

  const insertUserQuery = `
      INSERT INTO users (username, password, email, avatar, location, instrument, fav_genre, anthem) 
        VALUES ($/username/, $/password/, $/email/, $/avatar/, $/location/, $/instrument/, $/fav_genre/, $/anthem/)
        RETURNING *
    `

  const newUser = await db.one(insertUserQuery, {
    username: user.username,
    password: passwordDigest,
    email: user.email,
    avatar: user.avatar,
    location: user.location,
    instrument: user.instrument,
    fav_genre: user.fav_genre,
    anthem: user.anthem
  })

  let user_id = newUser.id;
  
  let newFollow = await db.one(`INSERT INTO follows (user_id, followed_id, active_status) VALUES ($1, $2, $3) RETURNING *`, [user_id, user_id, true]);
    
  delete newUser.password_digest 
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

const getUserbyID = async (id) => {
    const user = await db.oneOrNone("SELECT * FROM users WHERE id = $1", [id])
	return user;
}

  module.exports = { 
      createUser,
      getUserbyID,
      getUserByUsername,
      getAllUsers
  }
