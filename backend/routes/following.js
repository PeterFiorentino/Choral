var express = require('express');
var router = express.Router();
const db = require('../db/db');
const multer = require('multer');

router.post('/:is_following/follows/:being_followed', async (req, res) => {
   let is_following = req.params.is_following;
   let being_followed = req.params.being_followed
  
    try {
      let newFollow = await db.any(`INSERT INTO follow (is_following, being_followed) VALUES ($1, $2) RETURNING *`, [is_following, being_followed]);
      res.json({
        message: "Success",
        payload: newFollow, 
        error: null
      })
    } catch (error) {
      res.json({
        message: `Could not have user ${is_following} follow ${being_followed}`,
        payload: null,
        error: error
      })
    }
  });

module.exports = router;