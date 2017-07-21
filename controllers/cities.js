
const { Cities } = require('../models')
const { TripsCities } = require('../models')
const rp = require('request-promise')
const fbURL = 'https://graph.facebook.com/v2.4'

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


function fbfriendsCities(req, res, next) {
  let decoded = req.decoded
  console.log('hitting friends trips', req.decoded.fb_user_id);
    let options = {
      uri: `${fbURL}/${decoded.fb_user_id}/friends`,
      qs: {
        access_token: req.body.access_token,
      },
      headers: {
        'User-Agent': 'Request-Promise'
      },
      json: true
    }

    rp(options).then(response => {
      console.log('what we get back from fb friends request-->',response);
      console.log('fb friends data-->',response.data);
      console.log('fb friends summary-->',response.summary);
      res.json({response})

    }).catch(err => {
      console.log(err);
    })
  }


module.exports = {
  index, tripsCities, deleteCity, postCity, fbfriendsCities
}
