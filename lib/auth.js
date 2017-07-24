
const jwt = require('jwt-simple')


function hasJwtToken (req, res, next) {
  let token = getToken(req.headers)
  console.log('this is the token -->',token);

  if(token) {
      let decoded = jwt.decode(token, process.env.JWT_TOKEN)
      console.log('decoded', decoded);
      // if fb sends us an array
      if (Array.isArray(decoded)) {
        req.decoded = decoded[0]
        console.log('req.decoded -->',req.decoded);
      } else{
        req.decoded = decoded
        console.log('req.decoded -->',req.decoded);
      }
      next()
  } else {
    let error = {status:400, message: 'user is not authorized, token not provided.'}
    next(error)
  }
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
  hasJwtToken
}
