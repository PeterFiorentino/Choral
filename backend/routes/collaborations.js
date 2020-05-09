var express = require('express');
var router = express.Router();
const db = require('../db/db');
const multer = require('multer');

  router.get('/:session_id', async (req, res)  => {
    try {
      let collabs =  await db.any(`SELECT c.id, c.collaborator_id, c.session_id, c.audio, c.approved, c.volume, c.stereo_position, u.avatar, u.username FROM collaborations c LEFT JOIN users u ON u.id = c.collaborator_id WHERE c.session_id=$1`, req.params.session_id);
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
    let collaborator_id = req.body.collaborator_id
    let audio = req.body.audio
    let comment = req.body.comment
    let approved = req.body.approved
    let volume = req.body.volume
    let stereo_position = req.body.stereo_position
  
    try {
      let newCollab = await db.one(`INSERT INTO collaborations(session_id, collaborator_id, audio, comment, approved, volume, stereo_position) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [session_id, collaborator_id, audio, comment, approved, volume, stereo_position]);
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
    let volume = req.body.volume
    let stereo_position = req.body.stereo_position
    try {
      await db.none(`UPDATE collaborations SET approved = $1, volume = $2, stereo_position = $3 WHERE id = $4`, [approved, volume, stereo_position, req.params.collab_id]);
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