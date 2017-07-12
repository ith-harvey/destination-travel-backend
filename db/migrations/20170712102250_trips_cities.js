exports.up = function(knex) {
  return knex.schema.createTable('trips_cities',table => {
    table.increments().notNull()
    table.integer('trip_id').references('trips.id').onDelete('CASCADE')
    table.integer('city_id').references('cities.id').onDelete('CASCADE')
    table.timestamps(true,true)
  })
};

exports.down = function(knex) {
return knex.schema.dropTable('trips_cities')
};
