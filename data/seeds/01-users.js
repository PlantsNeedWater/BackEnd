exports.seed = function(knex, Promise) {
  return knex('users').insert([
    {username: "admin",phoneNumber: "973-255-0168", password: "admin" } 

  ]);
};

// table.increments("user_id")
//       table.string("username", 200).notNullable().unique()
//       table.integer("phoneNumber", 10).notNullable()
//       table.string("password", 200).notNullable()