
const Resource = require('./_Resource')('cities')
const knex = require('../db')

class Cities extends Resource {
  // static create (body) {
  //   console.log('body -->', body);
  //   const { email, password, first_name, last_name } = body
  //
  //   if (!email || !password) return Promise.reject({ status: 422, message: 'Email and password required.' })
  //
  //   return bcrypt.hash(password).then(password => {
  //     console.log('encrypted pass-->', password)
  //     return super.create({ email, password, first_name, last_name})
  //   })
  // }

  static findByUserId (id) {
    console.log('inside find user by id', id);
    return  knex('trips')
      .join('trips_cities', 'trips.id', 'trips_cities.trip_id')
      .join('cities', 'trips_cities.city_id', 'cities.id')
      .select('*','cities.id as city_id', 'trips.id as trip_id').where('trips_cities.trip_id', id);
  }
}

module.exports = Cities
