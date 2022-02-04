const db = require("../db-config");

function getAll() {
  return db("plants")
};

function findBy(filter) {
  return db("plants")
  .where(filter)
};

function findById(id) {
  return db("plants")
  .select("plant_id", "nickname", "species")
  .where("plant_id", id).first()
}

async function add(plant) {
  const [id] = await db("plants").insert(plant)

  return findById(id)
}

module.exports = {
  getAll,
  findBy,
  findById,
  add
}