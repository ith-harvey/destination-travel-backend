function isLoggedIn (req, res, next) {
  console.log('log dis shit', req.session);
  const err = { status: 401, message: 'User must be logged in.' }
  req.session.userId ? next() : next(err)
}

function isAuthorized (req, res, next) {
  const err = { status: 401, message: 'You do not have access to that page.' }
  req.session.userId == req.params.id ? next() : next(err)
}

module.exports = {
  isLoggedIn, isAuthorized
}
