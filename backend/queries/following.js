const db = require('../db/db');

const postNewFollow = async (user_id, followed_id) => {
    let newFollow = await db.one(`INSERT INTO follows (user_id, followed_id, active_status) VALUES ($1, $2, $3) RETURNING *`, [user_id, followed_id, true]);
    return newFollow
}

const getWhoYouFollow = async (user_id, followed_id) => {
    let doYouFollow = await db.one(`SELECT * FROM follows WHERE user_id = $1 AND followed_id = $2`, [user_id, followed_id]);
    return doYouFollow
}

const unfollow = async (user_id, followed_id) => {
    let unfollowing = await db.oneOrNone(`UPDATE follows SET active_status = false WHERE user_id = $1 AND followed_id = $2 RETURNING *`, [user_id, followed_id]);
    return unfollowing
}

const refollow = async (user_id, followed_id) => {
    let refollowing = await db.oneOrNone(`UPDATE follows SET active_status = true WHERE user_id = $1 AND followed_id = $2 RETURNING *`, [user_id, followed_id]);
    return refollowing
}

module.exports = {
    postNewFollow,
    getWhoYouFollow,
    unfollow,
    refollow
}