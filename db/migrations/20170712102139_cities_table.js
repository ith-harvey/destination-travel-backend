exports.up = function(knex) {
  return knex.schema.createTable('cities',table => {
    table.increments().notNull()
    table.string('city_name').notNull()
    table.string('city_description')
    table.string('city_lat').notNull()
    table.string('city_lng').notNull()
    table.timestamps(true,true)
  })
};

exports.down = function(knex) {
return knex.schema.dropTable('cities')
};
