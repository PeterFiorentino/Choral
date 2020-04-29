var express = require('express');
var router = express.Router();
const db = require('../db/db');
const multer = require('multer');

router.get('/', async (req, res) => {
    try{
      let allSessions = await db.any(`SELECT * FROM sessions`);
      res.json({
        message: "Success",
        payload: {
          sessions: allSessions
        }, 
        error: null
      })
    } catch (error) {
      res.json({
        message: "Had an issue retrieving the sessions",
        payload: null,
        error: error
      })
    }  
  });

  router.get('/:id', async (req, res)  => {
    try {
      let singleSession =  await db.any(`SELECT sessions.id, sessions.session_name, sessions.genre, sessions.bpm, sessions.session_key, sessions.chord_progression, sessions.looking_for, sessions.audio, sessions.art, sessions.session_closed, sessions.volume, sessions.stereo_position, users.avatar, users.username FROM sessions LEFT JOIN users ON sessions.owner_id = users.id WHERE sessions.id = $1;`, req.params.id);
      res.json({
        message: "Success",
        payload: {
          session: singleSession
        }, 
        error: null
      })
    } catch (error) {
      res.json({
        message: "There is no session with that id",
        payload: null,
        error: error
      })
    }
  });

  router.get('/user/:user_id', async (req, res)  => {
    try {

      let usersSessions =  await db.any(`SELECT sessions.id, sessions.session_name, sessions.genre, sessions.bpm, sessions.session_key, sessions.chord_progression, sessions.looking_for, sessions.audio, sessions.art, sessions.session_closed, sessions.volume, sessions.stereo_position, users.avatar, users.username FROM sessions LEFT JOIN users ON sessions.owner_id = users.id WHERE sessions.owner_id = $1;`, req.params.user_id);


      res.json({
        message: "Success",
        payload: {
          session: usersSessions
        }, 
        error: null
      })
    } catch (error) {
      res.json({
        message: "There is no session for that user",
        payload: null,
        error: error
      })
    }
  });

  router.patch('/:id', async (req, res)  => {
    let volume = req.body.volume
    let stereo_position = req.body.stereo_position
    try {
      await db.none(`UPDATE sessions SET volume = $1, stereo_position = $2 WHERE id=$3`, [volume, stereo_position, req.params.id]);
      res.json({
        message: "Success",
        payload: null,
        error: null
      })
    } catch (error) {
      res.json({
        message: "Cannot change that session",
        payload: null,
        error: error
      })
    }
  });

  router.post('/', async (req, res) => {
    let owner_id = req.body.owner_id
    let session_name = req.body.session_name
    let genre = req.body.genre
    let bpm = req.body.bpm
    let session_key = req.body.session_key
    let chord_progression = req.body.chord_progression
    let looking_for = req.body.looking_for
    let audio = req.body.audio
    let art = req.body.art
    let session_closed = req.body.session_closed
    let volume = req.body.volume
    let stereo_position = req.body.stereo_position
    
    try {
      let newSession = await db.one(`INSERT INTO sessions(owner_id, session_name, genre, bpm, session_key, chord_progression, looking_for, audio, art, session_closed, volume, stereo_position) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`, [owner_id, session_name, genre, bpm, session_key, chord_progression, looking_for, audio, art, session_closed, volume, stereo_position]);
      res.json({
        message: "Success",
        payload: {
          payload: newSession
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
  


  module.exports = router;
  