exports.seed = function(knex, Promise) {
  return knex('userPlants').insert([   
    
  ]);
};


// .createTable("userPlants", table => {
//   table.increments("userPlants_id")
//   table.integer("user_id")
//     .unsigned()
//     .notNullable()
//     .references("user_id")
//     .inTable("users")
//     .onDelete("RESTRICT")
//     .onUpdate("RESTRICT")
//   table.integer("plant_id")
//     .unsigned()
//     .notNullable()
//     .references("plant_id")
//     .inTable("plants")
//     .onDelete("RESTRICT")
//     .onUpdate("RESTRICT")
// })

// };