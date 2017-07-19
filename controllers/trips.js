
const { Trips } = require('../models')

function index (req, res, next) {
  Trips.all().then(trips => res.json({trips})).catch(next)
}

function individualsTrips (req, res, next) {
  Trips.findByUserId(req.params.id).then(trips => {
    res.json({trips})
   }).catch(next)
}

function create (req, res, next) {
  const body = req.body
  Trips.create(body).then(trips => {
    res.json({trips})
  }).catch(err => {
    next(err)
  })
}

function deleteTrip (req, res, next) {
  Trips.destroy(req.params.id).then(trips => {
    console.log('in delete')
    res.json({trips})
  }).catch(next)
}

module.exports = {
  index, individualsTrips, create, deleteTrip
}
