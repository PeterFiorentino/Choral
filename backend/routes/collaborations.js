var express = require('express');
var router = express.Router();
const db = require('../db/db');
const multer = require('multer');

  router.get('/:session_id', async (req, res)  => {
    try {
      let collabs =  await db.any(`SELECT c.id, c.collaborator_id, c.session_id, c.audio, c.instrument_name, c.approved, c.volume, c.stereo_position, u.avatar, u.username FROM collaborations c LEFT JOIN users u ON u.id = c.collaborator_id WHERE (c.session_id=$1 AND c.is_deleted = false)`, req.params.session_id);
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
    let instrument_name = req.body.instrument_name
  
    try {
      let newCollab = await db.one(`INSERT INTO collaborations(session_id, collaborator_id, audio, instrument_name, approved, volume, stereo_position, is_deleted) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`, [session_id, collaborator_id, audio, instrument_name, approved, volume, stereo_position, false]);
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

  router.patch('/clear_pool/:session_id', async (req, res)  => {
    let session_id = req.params.session_id
    
    try {
      let clear_pool =  await db.none(`UPDATE collaborations SET is_deleted = true WHERE session_id=$1 AND approved=false`, [session_id]);
      res.json({
        message: "Success",
        payload: clear_pool, 
        error: null
      })
    } catch (error) {
      res.json({
        message: "Cannot clear that pool",
        payload: null,
        error: error
      })
    }
  });

  router.patch('/delete/:id', async (req, res)  => {
    let id = req.params.id
    
    try {
      let deleteCollab =  await db.none(`UPDATE collaborations SET is_deleted = true WHERE id=$1`, [id]);
      res.json({
        message: "Success",
        payload: deleteCollab, 
        error: null
      })
    } catch (error) {
      res.json({
        message: "Cannot delete that collaboration",
        payload: null,
        error: error
      })
    }
  });

module.exports = router;