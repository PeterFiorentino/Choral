var express = require('express');
var router = express.Router();
const db = require('../db/db');
const multer = require('multer');
const userQueries = require('../queries/users')
const authHelpers = require('../auth/helpers')





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

module.exports = router;
