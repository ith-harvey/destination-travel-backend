
const { Cities } = require('../models')
const { TripsCities } = require('../models')

function index (req, res, next) {
  Cities.all().then(cities => res.json({cities})).catch(next)
}

function tripsCities (req, res, next) {
  Cities.findByUserId(req.params.id).then(cities => {
     res.json({cities})
  }).catch(err => {
    next(err)
  })
}

function deleteCity (req, res, next) {
  Cities.destroy(req.params.id).then(cities => {
     res.json({cities})
  }).catch(err => {
    next(err)
  })
}


function postCity (req, res, next) {
  const trip_id = Number(req.params.id)
  const body = req.body
  Cities.create(body).then((cities) => {

    let tripsCitiesObject = {
      city_id: cities[0].id,
      trip_id: trip_id,
    }

    TripsCities.create(tripsCitiesObject).then(trip_city => {
    res.json({trip_city})
    })
  }).catch(err => {
  next(err)
  })
}
//
module.exports = {
  index, tripsCities, deleteCity, postCity
}
