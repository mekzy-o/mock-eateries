import { Router } from 'express';
import { config } from 'dotenv';
import AuthController from '../controllers/AuthController';
import Validate from '../middlewares/inputValidation';


config();

const {
  registerUSer,
  userSignin,
} = AuthController;

const router = Router();

router.post('/signup', Validate.signup, registerUSer);
router.post('/signin', Validate.signin, userSignin);

export default router;
