const Resource = require('./_Resource')('users')
const bcrypt = require('bcrypt-as-promised')
const knex = require('../db')

class User extends Resource {
  static create (body) {
    console.log('body -->', body);
    const { email, password, first_name, last_name } = body

    if (!email || !password) return Promise.reject({ status: 422, message: 'Email and password required.' })

    return bcrypt.hash(password).then(password => {
      console.log('encrypted pass-->', password)
      return super.create({ email, password, first_name, last_name})
    })
  }

  static fbCreate (body) {
    console.log('body -->', body);
    const { email, fb_user_id, first_name, last_name } = body
    if (!email) return Promise.reject({ status: 422, message: 'Cannot retreive email from facebook.' })
      return super.create({ email, fb_user_id, first_name, last_name})
  }

  static findByEmail (email) {
    return knex('users').where({ email }).first()
  }

  static findByFbId (id) {
    console.log('in find!', id);
    return knex('users').where({ fb_user_id: id }).first()
  }

}

module.exports = User
