
const { Cities } = require('../models')

function index (req, res, next) {
  console.log('hitting index');
  Cities.all().then(cities => res.json({cities})).catch(next)
}

function tripsCities (req, res, next) {
  console.log('in cities')
  Cities.findByUserId(req.params.id).then(cities => {
    console.log('here is what comes back from our query -->', cities);
     res.json({cities})
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
  index, tripsCities
}
