const jwt = require('jwt-simple')
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
  User.create(body).then(user => {
    console.log('in create here is user after insert --> ',user)
    delete user.password
    let token = jwt.encode(user, process.env.JWT_TOKEN)
    res.json({success: true, token: 'JWT ' + token, user:user})
  }).catch((err) => {
    next(err)
  })
}


module.exports = {
  index, show, create
}
