import { Router } from 'express';
import authRoutes from './authRoutes';
import categoryRoutes from './categoryRoutes';
import recipeRoutes from './recipeRoutes';
import Authentication from '../middlewares/Authentication';

const router = Router();

router.use('/auth', authRoutes);
router.use(
  '/category',
  Authentication.passportJWT,
  categoryRoutes,
);
router.use(
  '/category',
  Authentication.passportJWT,
  recipeRoutes,
);

export default router;
