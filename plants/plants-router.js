const router = require("express").Router();

const Plant = require("./plants-model");
const {checkPlantExists, validatePlant} = require("./plants-middleware");

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

// .createTable("plants", table => {
//   table.increments("plant_id")
//   table.string("nickname", 200).notNullable().unique()
//   table.string("species", 50).notNullable()
//   table.integer("h20Frequency").notNullable()
//   // need to figure out how will use image, will the sting be a url that can be uploaded or what?
//   table.string("image")

// update

// delete



module.exports = router;