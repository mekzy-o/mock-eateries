import { Router } from 'express';
import authRoutes from './authRoutes';
import categoryRoutes from './categoryRoutes';
import recipeRoutes from './recipeRoutes';
import Authentication from '../middlewares/Authentication';
import searchRoutes from './searchRoutes';

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

router.use('/search', searchRoutes);

export default router;
