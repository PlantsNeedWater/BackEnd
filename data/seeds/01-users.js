exports.seed = function(knex, Promise) {
  return knex('users').insert([   
   
  ]);
};

// table.increments("user_id")
//       table.string("username", 200).notNullable().unique()
//       table.integer("phoneNumber", 10).notNullable()
//       table.string("password", 200).notNullable()