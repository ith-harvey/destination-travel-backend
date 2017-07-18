exports.up = function(knex) {
  return knex.schema.createTable('markers',table => {
    table.increments().notNull()
    table.string('marker_name').notNull()
    table.string('marker_description')
    table.string('marker_lat').notNull()
    table.string('marker_lng').notNull()
    table.integer('city_id').references('cities.id').onDelete('CASCADE')
    table.string('marker_place_id')
    table.timestamps(true,true)
  })
};

exports.down = function(knex) {
return knex.schema.dropTable('markers')
};
