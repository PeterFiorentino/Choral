var express = require('express');
var router = express.Router();
const db = require('./db');
const multer = require('multer');

router.get('/', async (req, res) => {
    try{
      let allSessions = await db.any(`SELECT * FROM sessions`);
      res.json({
        message: "Success",
        payload: {
          users: allSessions
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
      let singleSession =  await db.one(`SELECT * FROM sessions WHERE id=$1`, req.params.id);
      res.json({
        message: "Success",
        payload: {
          user: singleSession
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

  router.get('user/:user_id', async (req, res)  => {
    try {
      let usersSessions =  await db.one(`SELECT * FROM sessions WHERE user_id=$1`, req.params.user_id);
      res.json({
        message: "Success",
        payload: {
          user: usersSessions
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


  router.post('/', async (req, res) => {
    let user_id = req.body.user_id
    let session_name = req.body.session_name
    let genre = req.body.genre
    let bpm = req.body.bpm
    let session_key = req.body.session_key
    let chord_progression = req.body.chord_progression
    let looking_for = req.body.looking_for
    let audio = req.body.audio
    let session_closed = req.body.session_closed
    
    try {
      let newSession = await db.one(`INSERT INTO sessions(user_id, session_name, genre, bpm, session_key, chord_progression, looking_for, audio, session_closed) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`, [user_id, session_name, genre, bpm, session_key, chord_progression, looking_for, audio, session_closed]);
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
  
  router.patch('/:id', async (req, res)  => {
    let newAudio = req.body.newAudio
    try {
      let updateSession =  await db.none(`UPDATE sessions SET audio = $1 WHERE id=$2`, [newAudio,req.params.id]);
      res.json({
        message: "Success",
        payload: {
          user: updateSession
        }, 
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


  module.exports = router;
  