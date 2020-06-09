const db = require('../db/db');

const getAllReefs = async () => {
    let allReefs = await db.any(`SELECT reefs.id, reefs.owner_id, reefs.reef_name, reefs.looking_for, reefs.audio, reefs.art, reefs.volume, reefs.stereo_position, users.username, users.avatar FROM reefs JOIN users ON reefs.owner_id = users.id WHERE reefs.is_deleted = false`);
    return allReefs
}

const getLocalFeed = async (user_id) => {
    let localFeed = await db.any(`SELECT reefs.id, reefs.owner_id, reefs.reef_name, reefs.looking_for, reefs.audio, reefs.art, reefs.is_deleted, users.username, users.avatar FROM follows JOIN reefs ON reefs.owner_id = follows.followed_id JOIN users ON users.id = follows.followed_id WHERE (user_id = $1 AND active_status = true AND reefs.is_deleted = false)`, user_id)
    return localFeed
}

const getSingleReef = async (id) => {
    let singleReef =  await db.any(`SELECT reefs.id, reefs.owner_id, reefs.reef_name, reefs.looking_for, reefs.genre, reefs.bpm, reefs.reef_key, reefs.chord_progression, reefs.looking_for, reefs.audio, reefs.art, reefs.reef_closed, reefs.volume, reefs.stereo_position, users.avatar, users.username FROM reefs LEFT JOIN users ON reefs.owner_id = users.id WHERE (reefs.id = $1 AND reefs.is_deleted = false);`, id);
    return singleReef
}

const getAllReefsByUser = async (user_id) => {
    let users_reefs =  await db.any(`SELECT reefs.id, reefs.owner_id, reefs.reef_name, reefs.genre, reefs.bpm, reefs.reef_key, reefs.chord_progression, reefs.looking_for, reefs.audio, reefs.art, reefs.reef_closed, reefs.volume, reefs.stereo_position, users.avatar, users.username FROM reefs LEFT JOIN users ON reefs.owner_id = users.id WHERE (reefs.owner_id = $1 AND reefs.is_deleted = false);`, user_id);
    return users_reefs
}

const editReefsMixing = async (volume, stereo_position, id) => {
    let update_reef =  await db.none(`UPDATE reefs SET volume = $1, stereo_position = $2 WHERE id=$3`, [volume, stereo_position, id]);
    return update_reef
}

const postNewReef = async (owner_id, reef_name, genre, bpm, reef_key, chord_progression, looking_for, audio, art, reef_closed, volume, stereo_position) => {
    let newReef = await db.one(`INSERT INTO reefs(owner_id, reef_name, genre, bpm, reef_key, chord_progression, looking_for, audio, art, reef_closed, volume, stereo_position, is_deleted) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`, [owner_id, reef_name, genre, bpm, reef_key, chord_progression, looking_for, audio, art, reef_closed, volume, stereo_position, false]);
    return newReef
}

const deleteReef = async (reef_id) => {
    let deleteSession =  await db.none(`UPDATE reefs SET is_deleted = true WHERE id=$1`, reef_id);
    return deleteSession
}

module.exports = {
    getAllReefs,
    getLocalFeed,
    getSingleReef,
    getAllReefsByUser,
    editReefsMixing,
    postNewReef,
    deleteReef
}