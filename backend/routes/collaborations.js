var express = require('express');
var router = express.Router();
const db = require('./db');
const multer = require('multer');

  router.get('/:session_id', async (req, res)  => {
    try {
      let collabs =  await db.one(`SELECT * FROM collaborations WHERE session_id=$1`, req.params.session_id);
      res.json({
        message: "Success",
        payload: {
          user: collabs
        }, 
        error: null
      })
    } catch (error) {
      res.json({
        message: "There is no collabs for that session",
        payload: null,
        error: error
      })
    }
  });

  router.post('/', async (req, res) => {
    let session_id = req.body.session_id
    let session_owner = req.body.session_owner
    let audio = req.body.audio
    let comment = req.body.comment
    let approved = req.body.approved
  
    try {
      let newUser = await db.one(`INSERT INTO users(session_id, session_owner, audio, comment, approved) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [session_id, session_owner, audio, comment, approved]);
      res.json({
        message: "Success",
        payload: {
          newUser: newUser
        }, 
        error: null
      })
    } catch (error) {
      res.json({
        message: "Could not add new session",
        payload: null,
        error: error
      })
    }
  });
  
  router.patch('/:collab_id', async (req, res)  => {
    let approved = req.body.approved
    try {
      let collabs =  await db.none(`UPDATE collabs SET approved = $1 WHERE id=$2`, [approved, req.params.session_id]);
      res.json({
        message: "Success",
        payload: {
          user: collabs
        }, 
        error: null
      })
    } catch (error) {
      res.json({
        message: "There is no collabs for that session",
        payload: null,
        error: error
      })
    }
  });

module.exports = router;