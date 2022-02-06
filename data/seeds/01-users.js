exports.seed = function(knex, Promise) {
  return knex('users').insert([
    {username: "admin",phoneNumber: "973-255-0168", password: "admin" } 
  ]);
};