const router = require("express").Router();

const Plant = require("./plants-model");

router.get("/", (req, res, next) => {
  Plant.getAll()
  .then(plants => {
    res.status(200).json(plants)
  })
  .catch(next)
});



module.exports = router;