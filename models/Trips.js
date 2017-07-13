
const Resource = require('./_Resource')('trips')
const knex = require('../db')

class Trips extends Resource {

  static findByUserId (id) {
    const user_id = {user_id: id}
    return knex('trips').where( user_id )
  }
}

module.exports = Trips
