const express = require('express');
const router = express.Router();
const usersQueries = require('../queries/users');
const passport = require('../auth/passport');
const authHelpers = require('../auth/helpers')

router.post('/signup', async (req, res, next) => {
  try {
    const user = req.body;
    const newUser = await usersQueries.createUser(user)
    res.send({
      payload: newUser,
      msg: "New user signup success",
      err: false
    })
  } catch (err) {
    next(err)
  }
});

router.post("/login", passport.authenticate("local"), (req, res) => {
    // If this ever runs it's because authentication went well
    res.json({
      payload: req.user,
      msg: "User login success",
      err: false
    })
  });

router.post('/logout', authHelpers.loginRequired, (req, res, next) => {
    req.logout();
    res.json({
      msg: "User logout success",
      err: false
    })
});

router.get('/isUserLoggedIn', authHelpers.loginRequired, (req, res) => {
    res.json({
      payload: req.user,
      msg: "User is logged in. Session active",
      err: false
    })
  })
  
  module.exports = router
