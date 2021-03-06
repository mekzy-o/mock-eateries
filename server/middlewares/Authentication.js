/* eslint-disable new-cap */
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { config } from 'dotenv';
import ServerResponse from '../utils/responseHandler';

config();

const { errorResponse } = ServerResponse;

/**
 *
 *
 * @export
 * @class Authentication
 */
export default class Authentication {
  /**
   *Verify token for Authenticated routes
   *
   * @static
   *
   * @param {object} req
   * @param {object} res
   * @param {function} next
   *
   * @returns {function} next function
   *
   * @memberof Authentication
   */
  static async verifyToken(req, res, next) {
    try {
      const bearer = req.headers.authorization;
      const token = bearer.split(' ')[1];
      if (!bearer) {
        return errorResponse(res, 401, { message: 'No token provided' });
      }
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
          return errorResponse(res, 401, {
            message: 'Invalid token provided',
          });
        }
        req.user = decoded;
        return next();
      });
    } catch (err) {
      return next(err);
    }
  }

  /**
   * Checks for admin
   *
   * @static
   *
   * @param {object} req
   * @param {object} res
   * @param {function} next
   *
   * @returns {function} next function
   *
   * @memberof Authentication
   */
  static async verifyAdmin(req, res, next) {
    const { isAdmin } = req.user;
    if (!isAdmin) {
      return errorResponse(res, 403, { message: 'User not authorized' });
    }
    return next();
  }

  /**
   * Checks for User's Token
   *
   * @static
   *
   * @param {object} req
   * @param {object} res
   * @param {function} next
   *
   * @returns {function} next function
   *
   * @memberof Authentication
   */
  static async passportJWT(req, res, next) {
    passport.authenticate('jwt', (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        return errorResponse(res, 401, {
          message: 'You are not authorized to access this route',
        });
      }
      req.user = user;
      next();
    })(req, res, next);
  }
}
