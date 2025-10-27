require('dotenv').config()

const passport = require('passport');

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWTSECRET;

const User = require("../models/userDb")

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findUser(jwt_payload.sub);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
         }
         catch(err){
          return done(err,false);
         }
    }));

module.exports = passport;