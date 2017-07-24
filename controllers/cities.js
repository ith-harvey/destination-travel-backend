
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
  console.log('body',body);
  console.log('trip_id',trip_id);
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
    let promises = response.data.map( fbUserObj => {
      console.log('fbUserObj.id',fbUserObj.id);

      return User.findByFbId(fbUserObj.id).then(user => {
          console.log('mike-->', user)
          console.log('user.id',user.id);

        return  Trips.findByUserId({user_id: user.id}).then(trips => {
            console.log('all of Mikes trips--->', trips);


          let tripPromises = trips.map(trip => {
            console.log('trip.id',trip.id);
              return Cities.findByTripId(trip.id).then(cities => {
                console.log('all cities--->', cities);

                cities.forEach( city => {
                  city.fbName = fbUserObj.name
                })
                return cities
              })
            })

          return Promise.all(tripPromises).then(trips => {
            let reducTrip = trips.reduce((a,b) => a.concat(b))
            console.log('trips!!!!',reducTrip);
            return reducTrip
          })
        })
      }).catch(err => {
        console.log('user doesnt have a record in system',err);
      })
    })
    Promise.all(promises).then( result => {
      console.log('what we are sending!!!! --->',result);
      var cities = result.reduce((a,b) => a.concat(b))
      res.json(cities)
    })
    }).catch(err => {
      console.log(err);
    })

}

   function getCityById() {
    let city_id = req.params.id
    Cities.findById(city_id).then(city => {
      res.json({city})
    })
   }


module.exports = {
  index, tripsCities, deleteCity, postCity, fbfriendsCities, getCityById
}
