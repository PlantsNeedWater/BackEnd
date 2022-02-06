const Plant = require("./plants-model");

// unique constraint from sqlLite database may already be doing this
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

// does not seem to be working properly consistently
function validatePlant(req, res, next) {
  if(!req.body.nickname || !req.body.species || req.body.h20Frequency){
    res.status(400).json({message: "missing required plant creation field"})
  }else{
    next()
  }
};

const validatePlantId = async(req, res, next) => {
  const {id} = req.params
  try{
    const plants = await Plant.findById(id)
    if(!plants){
      res.status(404).json({ 
        message: "plant not found" })
    }else{
      req.plants = plants
      next()
    }
  }catch(err){
    res.status(500).json({
      message:`Error:${err.message}`
    })
    next()
  }
};

module.exports = {
  checkPlantExists,
  validatePlant,
  validatePlantId
}