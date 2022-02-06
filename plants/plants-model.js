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
  .select("plant_id", "nickname", "species", "h20Frequency")
  .where("plant_id", id).first()
}

async function add(plant) {
  const [id] = await db("plants").insert(plant)

  return findById(id)
}

function update(id, changes) {
  return db("plants")
  .where("plant_id", id)
  .update(changes)
  .then(rows => {
    return findById(id);
    });
};

function remove(id) {
  return db('plants')
    .where('plant_id', id)
    .del();
}

module.exports = {
  getAll,
  findBy,
  findById,
  add,
  update,
  remove
}