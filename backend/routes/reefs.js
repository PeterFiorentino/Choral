var express = require('express');
var router = express.Router();
const reefQueries = require('../queries/reefs')

router.get('/', async (req, res) => {
    try{
      let allReefs = await reefQueries.getAllReefs()
      res.json({
        message: "Success",
        payload: {
          reefs: allReefs

        }, 
        error: null
      })
    } catch (error) {
      res.json({
        message: "Had an issue retrieving the reefs",
        payload: null,
        error: error
      })
    }  
  });

router.get('/localfeed/:user_id', async (req, res) => {
  try {
    let localFeed = await reefQueries.getLocalFeed(req.params.user_id)
    res.json({
      message: "Success",
      payload: localFeed,
      error: null
    })
  } catch (error) {
    res.json({
      message: "Had an issue retrieving the local feed",
      payload: null,
      error: error
    })
  }
});

router.get('/:id', async (req, res)  => {
  try {
    let singleReef =  await reefQueries.getSingleReef(req.params.id);
    res.json({
      message: "Success",
      payload: {
        reef: singleReef
      }, 
      error: null
    })
  } catch (error) {
    res.json({
      message: "There is no reef with that id",
      payload: null,
      error: error
    })
  }
});

router.get('/user/:user_id', async (req, res)  => {
  try {
    let users_reefs =  await reefQueries.getAllReefsByUser(req.params.user_id);
    res.json({
      message: "Success",
      payload: {
        reef: users_reefs
      }, 
      error: null
    })
  } catch (error) {
    res.json({
      message: "There is no reef for that user",
      payload: null,
      error: error
    })
  }
});

router.patch('/:id', async (req, res)  => {
  let volume = req.body.volume
  let stereo_position = req.body.stereo_position
  try {
    let update_reef =  await reefQueries.editReefsMixing(volume, stereo_position, req.params.id);
    res.json({
      message: "Success",
      payload: {
        reef: update_reef
      }, 
      error: null
    })
  } catch (error) {
    res.json({
      message: "Cannot change that reef",
      payload: null,
      error: error
    })
  }
});

router.post('/', async (req, res) => {
  let owner_id = req.body.owner_id
  let reef_name = req.body.reef_name
  let genre = req.body.genre
  let bpm = req.body.bpm
  let reef_key = req.body.reef_key
  let chord_progression = req.body.chord_progression
  let looking_for = req.body.looking_for
  let audio = req.body.audio
  let art = req.body.art
  let reef_closed = req.body.reef_closed
  let volume = req.body.volume
  let stereo_position = req.body.stereo_position
  
  try {
    let new_reef = await reefQueries.postNewReef(owner_id, reef_name, genre, bpm, reef_key, chord_progression, looking_for, audio, art, reef_closed, volume, stereo_position);
    res.json({
      message: "Success",
      payload: {
        payload: new_reef
      }, 
      error: null
    })
  } catch (error) {
    res.json({
      message: "Could not add new reef",
      payload: null,
      error: error
    })
  }
});

router.patch('/delete/:id', async (req, res)  => {
  let id = req.params.id
  
  try {
    let delete_reef =  await reefQueries.deleteReef(id);
    res.json({
      message: "Success",
      payload: delete_reef, 
      error: null
    })
  } catch (error) {
    res.json({
      message: "Cannot delete that reef",
      payload: null,
      error: error
    })
  }
});



module.exports = router;