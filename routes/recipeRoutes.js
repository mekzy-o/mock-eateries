import { Router } from 'express';
import RecipeController from '../controllers/RecipeController';
import Authentication from '../middlewares/Authentication';
import Validate from '../middlewares/inputValidation';

const router = Router();

const {
  createRecipe, editRecipe, deleteRecipe, getRecipe, getAllRecipes,
} = RecipeController;
const { validateCategoryId, validateRecipeId, validateRecipeInput } = Validate;
const { verifyAdmin } = Authentication;

router.post('/:categoryId/recipe', validateRecipeInput, verifyAdmin, validateCategoryId, createRecipe);

router.patch(
  '/:categoryId/recipe/:recipeId',
  verifyAdmin,
  validateCategoryId,
  validateRecipeId,
  editRecipe,
);

router.delete(
  '/:categoryId/recipe/:recipeId',
  verifyAdmin,
  validateCategoryId,
  validateRecipeId,
  deleteRecipe,
);

router.get('/:categoryId/recipe/:recipeId', validateCategoryId,
  validateRecipeId, getRecipe);

router.get('/:categoryId/recipe', validateCategoryId,
  validateRecipeId, getAllRecipes);

export default router;
