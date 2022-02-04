exports.seed = function(knex, Promise) {
  return knex('plants').insert([   
    { nickname: 'Dragon Tree',species:"Dracaena draco", h2OFrequency: 1,},
    { nickname: 'Kapok Tree',species:"Ceiba pentandra", h2OFrequency: 2,},
    { nickname: 'Rainbow Eucalyptus',species:"Eucalyptus deglupta", h2OFrequency: 4,},
    { nickname: 'Giant Sequoia',species:"Sequoiadendron giganteum", h2OFrequency: 2,},
  ]);
};

