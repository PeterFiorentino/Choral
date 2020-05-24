var express = require('express');
var router = express.Router();
const db = require('../db/db');
const multer = require('multer');
const userQueries = require('../queries/users')
const authHelpers = require('../auth/helpers')


router.get('/:id', authHelpers.loginRequired, async (req, res, next)  => {
  try {
    let singleUser =  await userQueries.getUserbyID(req.params.id);
    res.send({
      message: "Success",
      payload: {
        user: singleUser
      }, 
      error: null
    })
  } catch (error) {
    next(error)
  }
});


router.get('/', authHelpers.loginRequired, async (req, res, next) => {
  try {
    const users = await userQueries.getAllUsers()
    res.send({
      payload: users,
      msg: "Retrieved all users",
      err: false
    })
  } catch (err) {
    next(err)
  }
});

router.patch('/:id', authHelpers.loginRequired, async (req, res)  => {
  let avatar = req.body.avatar
  let id = req.params.id
  
  try {
    let updateAvatar =  await db.none(`UPDATE users SET avatar = $1 WHERE id=$2`, [avatar, id]);
    res.json({
      message: "Success",
      payload: updateAvatar, 
      error: null
    })
  } catch (error) {
    res.json({
      message: "Cannot change that user's avatar",
      payload: null,
      error: error
    })
  }
});

module.exports = router;
