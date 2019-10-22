import { Router } from 'express';
import CategoryController from '../controllers/CategoryController';
import Authentication from '../middlewares/Authentication';


const router = Router();

const {
  createCategories, editCategories, deleteCategories, getCategories,
} = CategoryController;
const { verifyAdmin } = Authentication;

router.post('/', verifyAdmin, createCategories);

router.patch(
  '/:id',
  verifyAdmin,
  editCategories,
);

router.delete(
  '/:id',
  verifyAdmin,
  deleteCategories,
);

router.get('/:id', getCategories);

export default router;
