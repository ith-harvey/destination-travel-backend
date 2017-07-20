const { User } = require('../models')
const bcrypt = require('bcrypt-as-promised')
const jwt = require('jwt-simple')

function refresh (req, res, next) { // new
  const id = req.session.userId
  if (id) {
    User.findById(id)
      .then(user => res.json({ user: { id: user.id, email: user.email }}))
      .catch(next)
  } else {
    res.json(false)
  }
}

function create (req, res, next) {
  const { email, password } = req.body
  console.log('req.body',req.body);
  const err = { status: 400, message: 'Email and password are required' }

  if (!email || !password) return next(err)
  User.findByEmail(email)
    .then(user => {
      console.log('user -->', user);
      return bcrypt.compare(password, user.password)
        .then( () => {
          delete user.password
          let token = jwt.encode(user, process.env.JWT_TOKEN)
          console.log('in last part',token);
          res.json({success: true, token: 'JWT ' + token, user_id: user.id})
        })
    })
    .catch(() => next({ status: 401, message: 'Could not login user' }))
}

function destroy (req, res, next) {
  req.session.destroy((err) => err ? next(err) : res.json(true))
}

module.exports = {
  refresh, create, destroy
}
