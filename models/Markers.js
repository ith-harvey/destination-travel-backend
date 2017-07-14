const Resource = require('./_Resource')('markers')
const knex = require('../db')

class Markers extends Resource {
  static findByCityId (id) {
    const city_id = {city_id: id}
    return knex('markers').where( city_id )
  }

}

module.exports = Markers
