
const { User } = require('../models')

function index (req, res, next) {
  User.all().then(users => res.json({users})).catch(next)
}

function show (req, res, next) {
  const id = req.params.id
  User.findById(id).then(user => {
    console.log('in show user', user);
    delete user.password
    res.json({ user })
  }).catch(next)
}


function create (req, res, next) {
  const body = req.body
  console.log(User.create(body));
  User.create(body).then(([user]) => {
    console.log('in create')
    res.json({ user })
  }).catch(next)
}

module.exports = {
  index, show, create
}
