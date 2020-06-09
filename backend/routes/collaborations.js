var express = require('express');
var router = express.Router();
const collabQueries = require('../queries/collaborations')

router.get('/:reef_id', async (req, res)  => {
  let reef_id = req.params.reef_id
  try {
    let collabs = await collabQueries.getCollabsByReefID(reef_id)
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

router.get('/collaborators/:user_id', async (req, res)  => {
  let user_id = req.params.user_id
  try {
    let collaborators =  await collabQueries.getUsersCollaboratorsu(user_id);
    res.json({
      message: "Success",
      payload: collaborators,
      error: null
    })
  } catch (error) {
    res.json({
      message: "There was an error getting this user's collaborators",
      payload: null,
      error: error
    })
  }
});  

router.post('/', async (req, res) => {
  let collaborator_id = req.body.collaborator_id
  let reef_id = req.body.reef_id
  let reef_owner_id = req.body.reef_owner_id
  let audio = req.body.audio
  let instrument_name = req.body.instrument_name
  let approved = req.body.approved
  let volume = req.body.volume
  let stereo_position = req.body.stereo_position
  let is_deleted = req.body.is_deleted

  try {
    let newCollab = await collabQueries.postCollab(collaborator_id, reef_id, reef_owner_id, audio, instrument_name, approved, volume, stereo_position, is_deleted);
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
    await collabQueries.editCollab(approved, volume, stereo_position, req.params.collab_id);
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

router.patch('/clear_pool/:reef_id', async (req, res)  => {
  let reef_id = req.params.reef_id 
  try {
    let clear_pool =  await collabQueries.clearPool(reef_id);
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
    let deleteCollab =  await collabQueries.deleteCollab(id);
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