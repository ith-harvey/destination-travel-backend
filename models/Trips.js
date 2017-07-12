
const Resource = require('./_Resource')('trips')
const knex = require('../db')

class Trips extends Resource {
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

  // static findByEmail (email) {
  //   return knex('users').where({ email }).first()
  // }
}

module.exports = Trips
