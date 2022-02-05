const db = require("../db-config");

function getAll() {
  return db("users")
};

function findBy(filter) {
  return db("users")
  .where(filter)
};

function findById(id) {
  return db("users")
    .select("user_id", "username", "password", "phoneNumber")
    .where("user_id", id).first()
};

async function add(user) {
  const [id] = await db("users").insert(user)

  return findById(id)
};

function update(id, changes) {
  return db('users')
    .where("user_id", id)
    .update(changes)
    .then(rows => {
      return findById(id);
    });
}

module.exports = {
  getAll,
  findBy,
  findById,
  add,
  update
}