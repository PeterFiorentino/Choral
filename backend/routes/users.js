var express = require('express');
var router = express.Router();
const db = require('./db');
const multer = require('multer');

/* GET users listing. */
router.get('/', async (req, res) => {
  try{
    let allUsers = await db.any(`SELECT * FROM users`);
    res.json({
      message: "Success",
      payload: {
        users: allUsers
      }, 
      error: null
    })
  } catch (error) {
    res.json({
      message: "Had an issue retrieving the users",
      payload: null,
      error: error
    })
  }  
});

router.get('/:id', async (req, res)  => {
  try {
    let singleUser =  await db.one(`SELECT * FROM users WHERE id=$1`, req.params.id);
    res.json({
      message: "Success",
      payload: {
        user: singleUser
      }, 
      error: null
    })
  } catch (error) {
    res.json({
      message: "There is no users with that id",
      payload: null,
      error: error
    })
  }
});

router.post('/', async (req, res) => {
  let username = req.body.username
  let email = req.body.email
  let password = req.body.password
  let avatar = req.body.avatar

  try {
    let newUser = await db.one(`INSERT INTO users(username, email, password, avatar) VALUES ($1, $2, $3, $4) RETURNING *`, [username, email, password, avatar]);
    res.json({
      message: "Success",
      payload: {
        newUser: newUser
      }, 
      error: null
    })
  } catch (error) {
    res.json({
      message: "Could not add new user",
      payload: null,
      error: error
    })
  }
});


module.exports = router;
