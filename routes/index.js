import { Router } from 'express';
import authRoutes from './authRoutes';
import categoryRoutes from './categoryRoutes';
import Authentication from '../middlewares/Authentication';

const router = Router();

router.use('/auth', authRoutes);
router.use(
  '/category',
  Authentication.passportJWT,
  categoryRoutes,
);

export default router;
