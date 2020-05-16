var express = require('express');
var router = express.Router();
const db = require('../db/db');
const multer = require('multer');

router.post('/:user_id/follows/:followed_id', async (req, res) => {
   let user_id = req.params.user_id;
   let followed_id = req.params.followed_id
  
    try {
      let newFollow = await db.any(`INSERT INTO follows (user_id, followed_id, active_status) VALUES ($1, $2, $3) RETURNING *`, [user_id, followed_id, true]);
      res.json({
        message: "Success",
        payload: newFollow, 
        error: null
      })
    } catch (error) {
      res.json({
        message: `Could not have user ${user_id} follow ${followed_id}`,
        payload: null,
        error: error
      })
    }
  });

router.get('/:user_id/follows/:followed_id', async (req, res) => {
   let user_id = req.params.user_id;
   let followed_id = req.params.followed_id
  
    try {
      let doYouFollow = await db.one(`SELECT * FROM follows WHERE user_id = $1 AND followed_id = $2`, [user_id, followed_id]);
      res.json({
        message: "Success",
        payload: doYouFollow, 
        error: null
      })
    } catch (error) {
      res.json({
        message: `Could not get the follower relation`,
        payload: null,
        error: error
      })
    }
  });

router.patch('/:user_id/unfollow/:followed_id', async (req, res) => {
   let user_id = req.params.user_id;
   let followed_id = req.params.followed_id
  
    try {
      let unfollow = await db.oneOrNone(`UPDATE follows SET active_status = false WHERE user_id = $1 AND followed_id = $2 RETURNING *`, [user_id, followed_id]);
      res.json({
        message: "Success",
        payload: unfollow, 
        error: null
      })
    } catch (error) {
      res.json({
        message: `Could not unfollow the user`,
        payload: null,
        error: error
      })
    }
  });

  router.patch('/:user_id/refollow/:followed_id', async (req, res) => {
   let user_id = req.params.user_id;
   let followed_id = req.params.followed_id
  
    try {
      let refollow = await db.oneOrNone(`UPDATE follows SET active_status = true WHERE user_id = $1 AND followed_id = $2 RETURNING *`, [user_id, followed_id]);
      res.json({
        message: "Success",
        payload: refollow, 
        error: null
      })
    } catch (error) {
      res.json({
        message: `Could not refollow the user`,
        payload: null,
        error: error
      })
    }
  });





module.exports = router;