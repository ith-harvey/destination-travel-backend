exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments().notNull()
    table.string('fb_user_id')
    table.string('first_name').notNull()
    table.string('last_name').notNull()
    table.string('email').notNull().unique()
    table.specificType('password','char(60)')
    table.timestamps(true,true)
  })
};

exports.down = function(knex) {
return knex.schema.dropTable('users')
};
