

const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/users/auth/facebook/callback",
    profileFields: ['id', 'email', 'name','picture.type(large)']
  },
    function(accessToken, refreshToken, profile, cb) {
      console.log('success!!! access Token --->', accessToken);
      console.log('success!!! refresh Token --->', refreshToken);
      console.log('success!!! Profile --->', profile);
      console.log('Photo url --->', profile.photos[0].value);

        if (accessToken) {return facebookCallback(null,accessToken)}
        if (refreshToken) {return facebookCallback(null,refreshToken)}

        return facebookCallback(' ERROR : No refresh or access Token exists!')

        function facebookCallback(err,token) {
          console.log('error ----->',err);
          console.log('token ---->',token);

        }
    }
  )
