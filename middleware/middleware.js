const User = require("../auth/users-model");

function logger(req, res, next) {
  const date = new Date();
  console.log(`
    REQUEST METHOD: ${req.method},
    REQUEST URL: ${req.originalUrl},
    TIMESTAMP: ${date.toLocaleString()}
  `)
  next()
};

const validateUserId = async(req, res, next) => {
  const {id} = req.params
  try{
    const users = await User.findById(id)
    if(!users){
      res.status(404).json({ 
        message: "user not found" })
    }else{
      req.users = users
      next()
    }
  }catch(err){
    res.status(500).json({
      message:`Error:${err.message}`
    })
    next()
  }
};

function validateUser(req, res, next) {
  if(!req.body.password || !req.body.phoneNumber){
    res.status(400).json({message: "missing required registration field"})
  }else{
    next()
  }
}

module.exports = {
  logger,
  validateUserId,
  validateUser
};