const passport = require('passport');
const FacebookStrategy = require('passport-facebook');

const User = require('../../models/users');

module.exports = function() {
  passport.use(new FacebookStrategy({
    clientID: '1787582178167706',
    clientSecret: process.env.fbSecret,
    callbackURL: 'http://localhost:3000/auth/return',
    passReqToCallback: true
  },
  (req, token, refreshToken, profile, done) => {
    let query = {
      'fbid': profile.id
    };

    User.findOne(query).then(user => {
      if (user) {
        console.log('User found');
        done(null, user);

      } else {
        console.log('User not found - adding to DB');

        new User({ fbid: profile.id,
          displayName: profile.displayName,
          image: `http://graph.facebook.com/${profile.id}/picture?width=400&height=400`,
          token: token,
          stats: 0,
          favorites: [],
          queue: [] }).save(err => {
          console.log(err);
        });
        done(null, user);
      }
    }).catch(err => {
      throw err;
    })
  }))
}