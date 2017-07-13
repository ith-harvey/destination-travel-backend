
const { Markers } = require('../models')

function index (req, res, next) {
  console.log('hitting index');
  Markers.all().then(markers => res.json({markers})).catch(next)
}

function cityMarkers (req, res, next) {
  console.log('in cities')
  Markers.findByCityId(req.params.id).then(markers => {
    console.log('here is what comes back from our query -->', markers);
     res.json({markers})
  }).catch(err => {
    next(err)
  })
}

// function show (req, res, next) {
//   const id = req.params.id
//   User.findById(id).then(user => {
//     console.log('in show user', user);
//     delete user.password
//     res.json({ user })
//   }).catch(next)
// }
//
//
// function create (req, res, next) {
//   const body = req.body
//   console.log(User.create(body));
//   User.create(body).then(([user]) => {
//     console.log('in create')
//     res.json({ user })
//   }).catch(next)
// }
//
module.exports = {
  index, cityMarkers
}
