
const { Cities } = require('../models')
const { TripsCities } = require('../models')
const { Trips } = require('../models')
const { User } = require('../models')

const rp = require('request-promise')
const fbURL = 'https://graph.facebook.com/v2.4'

function index (req, res, next) {
  Cities.all().then(cities => res.json({cities})).catch(next)
}

function tripsCities (req, res, next) {
  Cities.findByTripId(req.params.id).then(cities => {
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
  let returnCityArr = []
  let decoded = req.decoded

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
      console.log('fb friends data-->',response.data);

      // for each user object request all trips associated
      response.data.forEach( fbUserObj => {

        User.findByFbId(fbUserObj.id).then(user => {
          // console.log('mike-->', user)

          Trips.findByUserId({user_id: user.id}).then(trips => {
            // console.log('all of Mikes trips--->', trips);

          let promises = trips.map(trip => {
              return Cities.findByTripId(trip.id).then(cities => {
                // console.log('all cities--->', cities);

                cities.forEach( city => {
                  city.fbName = fbUserObj.name
                })
                return cities
              })
            })
            Promise.all(promises).then( result => {
              var cities = result.reduce((a,b) => a.concat(b))
              res.json(cities)
            })
          })
         })
      })
    }).catch(err => {
      console.log(err);
    })

}


module.exports = {
  index, tripsCities, deleteCity, postCity, fbfriendsCities
}
