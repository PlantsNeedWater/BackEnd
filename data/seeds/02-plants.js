exports.seed = function(knex, Promise) {
  return knex('plants').insert([   
    { nickname: 'Dragon Tree',species:"Dracaena draco", h20Frequency: 1,},
    { nickname: 'Kapok Tree',species:"Ceiba pentandra", h20Frequency: 2,},
    { nickname: 'Rainbow Eucalyptus',species:"Eucalyptus deglupta", h20Frequency: 4,},
    { nickname: 'Giant Sequoia',species:"Sequoiadendron giganteum", h20Frequency: 2,},
  ]);
};

