
exports.up = async function (knex) {
  await knex.schema
    .createTable("users", table => {
      table.increments("user_id")
      table.string("username", 200).notNullable().unique()
      table.integer("phoneNumber", 10).notNullable()
      table.string("password", 200).notNullable()
    })
    .createTable("plants", table => {
      table.increments("plant_id")
      table.string("nickname", 200).notNullable().unique()
      table.string("species", 50).notNullable()
      table.integer("h20Frequency").notNullable()
      // need to figure out how will use image, will the sting be a url that can be uploaded or what?
      table.string("image")
    })
    .createTable("userPlants", table => {
      table.increments("userPlants_id")
      table.integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onDelete("RESTRICT")
        .onUpdate("RESTRICT")
      table.integer("plant_id")
        .unsigned()
        .notNullable()
        .references("plant_id")
        .inTable("plants")
        .onDelete("RESTRICT")
        .onUpdate("RESTRICT")
    })

};

//remove plant and user tables in down function
exports.down = async function (knex) {
  await knex.schema
    .dropTableIfExists("user_plants")
    .dropTableIfExists("plants")
    .dropTableIfExists("users")
};
