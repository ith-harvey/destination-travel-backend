exports.up = function(knex) {
  return knex.schema.createTable('trips',table => {
    table.increments().notNull()
    table.string('trip_name').notNull()
    table.string('trip_description').notNull()
    table.integer('user_id').references('users.id').onDelete('CASCADE')
    table.timestamps(true,true)
  })
};

exports.down = function(knex) {
return knex.schema.dropTable('trips')
};
