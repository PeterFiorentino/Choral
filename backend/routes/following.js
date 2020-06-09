var express = require('express');
var router = express.Router();
const followingQueries = require('../queries/following')

router.post('/:user_id/follows/:followed_id', async (req, res) => {
   let user_id = req.params.user_id;
   let followed_id = req.params.followed_id
  
    try {
      let newFollow = await followingQueries.newFollow(user_id, followed_id, true);
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
      let doYouFollow = await followingQueries.getWhoYouFollow(user_id, followed_id);
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
      let unfollow = await followingQueries.unfollow(user_id, followed_id);
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
      let refollow = await followingQueries.refollow(user_id, followed_id);
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