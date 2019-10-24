import { Router } from 'express';
import CategoryController from '../controllers/CategoryController';
import Authentication from '../middlewares/Authentication';
import Validate from '../middlewares/inputValidation';

const router = Router();

const { validateCategory, validateParamsId } = Validate;

const {
  createCategories, editCategories, deleteCategories, getCategories, getSingleCategory,
} = CategoryController;
const { verifyAdmin } = Authentication;

router.post('/', verifyAdmin, validateCategory, createCategories);

router.patch(
  '/:id',
  verifyAdmin,
  validateParamsId,
  editCategories,
);

router.delete(
  '/:id',
  verifyAdmin,
  deleteCategories,
);

router.get('/', getCategories);

router.get('/:id', validateParamsId, getSingleCategory);
export default router;
