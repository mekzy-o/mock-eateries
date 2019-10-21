import { Router } from 'express';
import { config } from 'dotenv';
import passport from 'passport';
import AuthController from '../controllers/AuthController';
import Authentication from '../middlewares/Authentication';
import Validate from '../middlewares/inputValidation';


config();

const passportService = require('../middlewares/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false })

const {
  registerUSer,
  userSignin,
} = AuthController;

const { verifyToken } = Authentication;

const router = Router();

router.post('/signup', Validate.signup, registerUSer);
router.post('/signin', Validate.signin, userSignin);

export default router;
