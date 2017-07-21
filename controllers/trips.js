const jwt = require('jwt-simple')
const { Trips } = require('../models')

function index (req, res, next) {
  Trips.all().then(trips => res.json({trips})).catch(next)
}

function individualsTrips (req, res, next) {
  let decoded = req.decoded
  console.log('here it is! -->',decoded.id);

    Trips.findByUserId({user_id: decoded.id}).then(trips => {
      res.json({trips})
     }).catch(next)

}

function create (req, res, next) {
  console.log('in create trips');

  req.body.user_id = req.decoded.id
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
