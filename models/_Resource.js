const db = require('../db')

function ResourceFactory (table) {
  class Resource {
    constructor () {}

    static all () {
      return db(table)
    }

    static findById (id) {
      return db(table).where({ id }).first()
    }

    static create (body) {
      return db(table).insert(body).returning('*')
    }

    static update (id, body) {
      return db(table).update(body).where({ id }).returning('*')
    }

    static destroy (id) {
      return db(table).del().where({ id }).returning('*')
    }
  }

  return Resource
}

module.exports = ResourceFactory
