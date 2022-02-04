const router =require("express").Router();
const {JWT_SECRET, BCRYPT_ROUNDS} = require("../secrets/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./users-model")

router.post("/register", (req, res, next) => {
  const {username, password, phoneNumber} = req.body

  const hash = bcrypt.hashSync(password, BCRYPT_ROUNDS)

  User.add({username, password: hash, phoneNumber})
    .then(newUser => {
      res.status(201).json(newUser)
    })
    .catch(next)
});

module.exports = router;