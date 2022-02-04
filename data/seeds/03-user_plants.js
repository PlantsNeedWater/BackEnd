exports.seed = function(knex, Promise) {
  return knex('userPlants').insert([   
    {user_id: 1, plant_id: 1}
    
  ]);
};