const jwt = require('jwt-simple')
const { Trips } = require('../models')

function index (req, res, next) {
  Trips.all().then(trips => res.json({trips})).catch(next)
}

function individualsTrips (req, res, next) {
  console.log('in individual trips');
  let token = getToken(req.headers)
  console.log('this is the token -->',token);
  if(token) {
      let decoded = jwt.decode(token, process.env.JWT_TOKEN)
      console.log('here it is! -->',decoded.id);
    Trips.findByUserId(decoded.id).then(trips => {
      res.json({trips})
     }).catch(next)
  } else {
    return res.status(403).send({success:false, msg: 'No token provided'})
  }
}

function create (req, res, next) {
  console.log('in individual trips');
  let token = getToken(req.headers)
  console.log('this is the token -->',token);
  if(token) {
      let decoded = jwt.decode(token, process.env.JWT_TOKEN)
      console.log('here it is! -->',decoded.id);

      req.body.user_id = decoded.id
      const body = req.body
      Trips.create(body).then(trips => {
        res.json({trips})
      }).catch(err => {
        next(err)
      })
  }
}

function deleteTrip (req, res, next) {
  Trips.destroy(req.params.id).then(trips => {
    console.log('in delete')
    res.json({trips})
  }).catch(next)
}

let getToken = function (headers) {
  if (headers && headers.authorization) {
    let parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = {
  index, individualsTrips, create, deleteTrip
}
