
const Resource = require('./_Resource')('trips')
const knex = require('../db')

class Trips extends Resource {

  static findByUserId (idobj) {
    return knex('trips').where(idobj)
  }
}

module.exports = Trips
