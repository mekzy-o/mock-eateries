/* eslint-disable func-names */
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { config } from 'dotenv';
import { User } from '../database/models';

config();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
};

export default (passport) => {
  passport.use(
    new JwtStrategy(opts, async (jwtPayload, done) => {
      try {
        const user = await User.findOne({ where: { id: jwtPayload.id } });
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (err) {
        console.log(err);
      }
    }),
  );
};
