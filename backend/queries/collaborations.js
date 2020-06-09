const db = require('../db/db')

const getCollabsByReefID = async (reef_id) => {
    let collabs =  await db.any(`SELECT c.id, c.collaborator_id, c.reef_id, c.audio, c.instrument_name, c.approved, c.volume, c.stereo_position, u.avatar, u.username FROM collaborations c LEFT JOIN users u ON u.id = c.collaborator_id WHERE (c.reef_id=$1 AND c.is_deleted = false)`, reef_id);
    return collabs
}

const getUsersCollaborators = async (user_id) => {
    let collaborators =  await db.any(`SELECT users.avatar, users.username, users.id FROM users JOIN collaborations ON users.id = collaborations.collaborator_id WHERE (collaborations.reef_owner_id = $1 AND approved = true);`, user_id);
    return collaborators;
}  

const postCollab = async (collaborator_id, reef_id, reef_owner_id, audio, instrument_name, approved, volume, stereo_position, is_deleted) => {
    let newCollab = await db.none(`INSERT INTO collaborations(collaborator_id, reef_id, reef_owner_id, audio, instrument_name, approved, volume, stereo_position, is_deleted) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`, [collaborator_id, reef_owner_id, reef_id, audio, instrument_name, approved, volume, stereo_position, is_deleted]);
    return newCollab
}

const editCollab = async (approved, volume, stereo_position, collab_id) => {
    let editedCollab = await db.none(`UPDATE collaborations SET approved = $1, volume = $2, stereo_position = $3 WHERE id = $4`, [approved, volume, stereo_position, collab_id]);
    return editedCollab
}

const clearPool = async (reef_id) => {
    let clear_pool =  await db.none(`UPDATE collaborations SET is_deleted = true WHERE reef_id=$1 AND approved=false`, reef_id);
    return clear_pool
}

const deleteCollab = async (id) => {
    let delete_Collab =  await db.none(`UPDATE collaborations SET is_deleted = true WHERE id=$1`, id);
    return delete_Collab
}

module.exports = {
    getCollabsByReefID,
    getUsersCollaborators,
    postCollab,
    editCollab,
    clearPool,
    deleteCollab
}