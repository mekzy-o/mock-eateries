/* eslint-disable func-names */
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { config } from 'dotenv';
import User from '../database/models';

config();

module.exports = async function (passport) {
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET_KEY,
      },
      (jwt_payload, done) => {
        User.findOne({ where: { _id: jwt_payload.sub } }, (error, user) => {
          if (error) {
            return done(error, false);
          }
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        });
      },
    ),
  );
};
