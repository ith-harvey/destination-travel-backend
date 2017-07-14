
const Resource = require('./_Resource')('cities')
const knex = require('../db')

class Cities extends Resource {

  static findByUserId (id) {
    console.log('inside find user by id', id);
    return  knex('trips')
      .join('trips_cities', 'trips.id', 'trips_cities.trip_id')
      .join('cities', 'trips_cities.city_id', 'cities.id')
      .select('*','cities.id as city_id', 'trips.id as trip_id').where('trips_cities.trip_id', id);
  }
}

module.exports = Cities