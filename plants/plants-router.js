const router = require("express").Router();

const Plant = require("./plants-model");
const {checkPlantExists, validatePlant, validatePlantId} = require("./plants-middleware");

router.get("/", (req, res, next) => {
  Plant.getAll()
  .then(plants => {
    res.status(200).json(plants)
  })
  .catch(next)
});

// create
router.post("/", checkPlantExists, (req, res, next) => {
  const {nickname, species, h20Frequency, image} = req.body

  Plant.add({nickname, species, h20Frequency, image})
    .then(newPlant => {
      res.status(201).json(newPlant)
    })
    .catch(next)
});

// update
router.put("/:id", validatePlantId, (req, res) => {
  Plant.update(req.params.id, req.body)
    .then(plants => {
      res.status(200).json(plants)
    })
    .catch(error => {
      res.status(500).json({
        message: "Error updating the plant",
        error: error.message
      })
    })
});

// delete



module.exports = router;