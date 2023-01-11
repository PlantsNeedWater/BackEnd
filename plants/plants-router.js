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

// Delete
router.delete("/:id", validatePlantId, async (req, res) => {
  const {id} = req.params;
  // Find plant that you are trying to delete
  const plant = await Plant.findById(id)
  //delete plant
  await Plant.remove(id)
    .then(() => {
      res.json({
        message: "Plant removed successfully",
        data: plant
      })
    })
    .catch(error => {
      res.status(400).json({
        message: "the plant could not be removed",
        error: error.message
      })
    });
});


// router.delete("/:id", async (req, res) => {
//   const {id} = req.params

//   try{
//     const plantTbd = await Plant.findById(id)
//     if(!plantTbd){
//       res.status(404).json({
//         message: "The plant with the specified ID does not exist"
//       })
//     }
//     else{
//       await Plant.remove(id)
//       res.json(plantTbd,{
//         message: "the plant has been deleted"
//       })
//     }
//   }
//   catch{
//     res.status(500).json({
//       message: "the plant could not be removed",
//     })
//   }
// });


// router.delete('/:id', validateUserId, async (req, res) => {
//   // RETURN THE FRESHLY DELETED USER OBJECT
//   // the first check is redundant and does same as validateuserId - fix
//   const {id} = req.params
//   try{
//     const userTbd = await User.getById(id)
//     if(!userTbd){
//       res.status(404).json({
//         message: "The user with the specified ID does not exist"
//       })
//     }else{
//       await User.remove(id)
//       res.json(userTbd)
//     }
//   } catch(err){
//     res.status(500).json({
//       message: "The user could not be removed"
//     })
//   }
// });



module.exports = router;