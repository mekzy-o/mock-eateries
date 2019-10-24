import dotenv from 'dotenv';
import { User } from '../database/models';
import Helper from '../utils/helpers';
import ServerResponse from '../utils/responseHandler';

dotenv.config();

const { successResponse, errorResponse } = ServerResponse;

/**
 *
 *
 * @export
 * @class AuthController
 */
export default class AuthController {
  /**
   *
   * @static
   *
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {function} next
   *
   * @returns {object} returns user data
   *
   * @memberof AuthController
   */
  static async registerUSer(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const foundUser = await User.findOne({ where: { email } });
      if (foundUser) {
        return errorResponse(res, 409, { message: 'This User already exist' });
      }
      const hashedPassword = Helper.hashPassword(password);
      const user = {
        name,
        email,
        password: hashedPassword,
      };
      const createUser = await User.create(user);
      const token = Helper.createToken({
        id: createUser.id,
        name: createUser.name,
        email: createUser.email,
        isAdmin: createUser.isAdmin,
      });
      return successResponse(res, 201, 'user', {
        message: 'Account has been created successfully!',
        token,
      });
    } catch (err) {
      return next(err);
    }
  }

  /**
   *
   * @static
   *
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {function} next
   *
   * @returns {object} returns user data
   *
   * @memberof AuthController
   */
  static async registerAdmin(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const foundUser = await User.findOne({ where: { email } });
      if (foundUser) {
        return errorResponse(res, 409, { message: 'This User already exist' });
      }
      const hashedPassword = Helper.hashPassword(password);
      const user = {
        name,
        email,
        password: hashedPassword,
        isAdmin: true,
      };
      const createUser = await User.create(user);

      const token = Helper.createToken({
        id: createUser.id,
        name: createUser.name,
        email: createUser.email,
        isAdmin: createUser.isAdmin,
      });
      return successResponse(res, 201, 'user', {
        message: 'Account has been created successfully!',
        token,
      });
    } catch (err) {
      return next(err);
    }
  }

  /**
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {function} next
   * @returns {object} returns user data
   * @memberof AuthController
   */
  static async userSignin(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return errorResponse(res, 401, {
          message: 'You Entered an incorrect Email or Password',
        });
      }

      const {
        id, name, email: emailAddress, isAdmin,
      } = user.dataValues;

      const token = Helper.createToken({
        id,
        name,
        email: emailAddress,
        isAdmin,
      });

      const comparePassword = await Helper.comparePassword(
        password,
        user.dataValues.password,
      );

      if (!comparePassword) {
        return errorResponse(res, 401, {
          message: 'You Entered an incorrect Email or Password',
        });
      }
      return successResponse(res, 200, 'user', {
        message: 'You have successfully logged in',
        token,
      });
    } catch (error) {
      return next(error);
    }
  }
}
