const router =require("express").Router();
const {JWT_SECRET, BCRYPT_ROUNDS} = require("../secrets/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./users-model");
const { validateUserId, validateUser } = require("../middleware/middleware");
const { checkUsernameFree } = require("./auth-middleware");

router.get("/users", (req, res) => {
  User.getAll(req.query)
    .then(users => {
      res.status(200).json(users)
    })
    .catch(error => {
      res.status(500).json({
        message: "Error retrieving the users",
        error: error.message
      })
    })
});

router.get("/users/:id", validateUserId, (req, res) => {
  res.status(200).json(req.users)
});

// updating the user
router.put("/users/:id", validateUserId, validateUser, (req, res) => {
  User.update(req.params.id, req.body)
    .then(users => {
      res.status(200).json(users)
    })
    .catch(error => {
      res.status(500).json({
        message: "Error updating the users",
        error: error.message
      })
    })
})

router.post("/register",checkUsernameFree, validateUser, (req, res, next) => {
  const {username, password, phoneNumber} = req.body

  const hash = bcrypt.hashSync(password, BCRYPT_ROUNDS)

  User.add({username, password: hash, phoneNumber})
    .then(newUser => {
      res.status(201).json(newUser)
    })
    .catch(next)
});

router.post("/login", async (req, res, next) => {
  const [user] = await User.findBy({username: req.body.username})
  req.user = user
  if(user && bcrypt.compareSync(req.body.password, req.user.password)){
    const token = buildToken(req.user)
    res.json({
      message: `Welcome ${req.user.username}`,
      token,
    })
  }
  else{
    next({status: 401, message: "invalid credentials"})
  }
});

function buildToken(user) {
  const payload = {
    username: user.username
  }
  const options = {
    expiresIn: "1d"
  }
  return jwt.sign(payload, JWT_SECRET, options)
};

module.exports = router;