
const { Trips } = require('../models')

function index (req, res, next) {
  console.log('hitting index');
  Trips.all().then(trips => res.json({trips})).catch(next)
}

function individualsTrips (req, res, next) {
  console.log('req.params',req.params);
  console.log('hitting individualsTrips');
  Trips.findByUserId(req.params.id).then(trips => res.json({trips})).catch(next)
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
  index, individualsTrips
}
