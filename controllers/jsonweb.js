const { User } = require('../models')
const bcrypt = require('bcrypt-as-promised')
const jwt = require('jwt-simple')
const rp = require('request-promise')
const fbURL = 'https://graph.facebook.com/v2.4'

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

function fbCreate (req, res, next) {
  console.log('should be our access token -->',req.body);
  const { access_token, expires_in } = req.body
  console.log(access_token,'access_token');
  let options = {
    uri: `${fbURL}/me`,
    qs:{
      access_token: access_token,
      fields: 'email,id,first_name,last_name'
    },
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true
  }

  rp(options).then(response => {
    console.log('what we get back from fb-->',response);
    const {email, first_name, last_name, id} = response
    fbname = response.name
    fbUserId = response.id



  })

  const err = { status: 400, message: 'Email and password are required' }

  // if (!email || !password) return next(err)
  // User.findByEmail(email)
  //   .then(user => {
  //     console.log('user -->', user);
  //     return bcrypt.compare(password, user.password)
  //       .then( () => {
  //         delete user.password
  //         let token = jwt.encode(user, process.env.JWT_TOKEN)
  //         console.log('in last part',token);
  //         res.json({success: true, token: 'JWT ' + token, user_id: user.id})
  //       })
  //   })
  //   .catch(() => next({ status: 401, message: 'Could not login user' }))
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
  refresh, create, destroy, fbCreate
}
