var express = require('express');
var router = express.Router();
const db = require('../db/db');
const multer = require('multer');

  router.get('/:session_id', async (req, res)  => {
    try {
      let collabs =  await db.any(`SELECT c.id, c.collaborator_id, c.session_id, c.audio, c.approved, c.volume, u.avatar, u.username FROM collaborations c LEFT JOIN users u ON u.id = c.collaborator_id WHERE c.session_id=$1`, req.params.session_id);
      res.json({
        message: "Success",
        payload: {
          collabs: collabs
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
      let newCollab = await db.one(`INSERT INTO collaborations(session_id, session_owner, audio, comment, approved) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [session_id, session_owner, audio, comment, approved]);
      res.json({
        message: "Success",
        payload: {
          newCollab: newCollab
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
      await db.none(`UPDATE collaborations SET approved = $1 WHERE id=$2`, [approved, req.params.collab_id]);
      res.json({
        message: "Success",
        payload: null,
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