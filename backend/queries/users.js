const db = require('../db/db')
const authHelpers = require("../auth/helpers");
const followingQueries = require('../queries/following')

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
  delete newUser.password_digest 

  followingQueries.postNewFollow(user_id, user_id)
      
  return newUser
}

const getAllUsers = async () => {
    const users = await db.any("SELECT * FROM users")
    return users;
  }

const getUserByUsername = async (username) => {
	const user = await db.oneOrNone("SELECT * FROM users WHERE username = $1", [username])
	return user;
}

const getUserbyID = async (id) => {
  const user = await db.oneOrNone("SELECT * FROM users WHERE id = $1", [id])
	return user;
}


const updateAvatar = async (avatar, id) => { 
  const updatedUser = await db.oneOrNone(`UPDATE users SET avatar = $1 WHERE id=$2`, [avatar, id]);
  return updatedUser
}

const updateUserInfo = async (username, email, location, instrument, fav_genre, anthem, id) => {
  let updatedInfo =  await db.oneOrNone(`UPDATE users SET username = $1, email = $2, location = $3, instrument = $4, fav_genre = $5, anthem = $6 WHERE id=$7`, [username, email, location, instrument, fav_genre, anthem, id]);
  return updatedInfo
}

  module.exports = { 
      createUser,
      getUserbyID,
      getUserByUsername,
      getAllUsers,
      updateAvatar,
      updateUserInfo
  }
