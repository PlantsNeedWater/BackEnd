const Plant = require("./plants-model");

async function checkPlantExists(req, res, next) {
  try{
    const plants = await Plant.findBy({nickname:req.body.nickname})
    if(!plants.length){
      next()
    }
    else next(
      {message:"Plant already exists in database", status: 422}
    )
  }
  catch(err){
    next(err)
  }
};

function validatePlant(req, res, next) {
  if(!req.body.password || !req.body.phoneNumber){
    res.status(400).json({message: "missing required registration field"})
  }else{
    next()
  }
};

module.exports = {
  checkPlantExists,
  validatePlant,
}