import dotenv from 'dotenv';
import { Recipes, Categories } from '../database/models';
import ServerResponse from '../utils/responseHandler';

dotenv.config();

const { successResponse, errorResponse } = ServerResponse;

class RecipeController {
  /**
   * Create A recipe
   * @param {object} req
   * @param {object} res
   * @returns {object} recipe  object
   */
  static async createRecipe(req, res, next) {
    try {
      const { recipeName, ingredients } = req.body;
      const { categoryId } = req.params;
      const { id } = req.user;

      const checkCategoryExists = await Categories.findOne({ where: { id: categoryId } });
      if (!checkCategoryExists) {
        return errorResponse(res, 404, 'Category was not found in the database!');
      }

      const newRecipe = {
        createdBy: id,
        categoryId,
        recipeName,
        ingredients,
      };

      const createdRecipe = await Recipes.create(newRecipe);
      return successResponse(res, 201, 'Recipe created successfully!', createdRecipe);
    } catch (err) {
      return next(err);
    }
  }

  /**
   * Edit A recipe
   * @param {object} req
   * @param {object} res
   * @returns {object} recipe object
   */
  static async editRecipe(req, res, next) {
    try {
      const { recipeName, ingredients } = req.body;
      const { categoryId, recipeId } = req.params;

      const checkCategoryExists = await Categories.findOne({ where: { id: categoryId } });
      if (!checkCategoryExists) {
        return errorResponse(res, 404, 'This category does not exist in the database');
      }

      const checkRecipeExists = await Recipes.findOne({ where: { id: recipeId } });
      if (!checkRecipeExists) {
        return errorResponse(res, 404, 'This recipe does not exist in the database');
      }
      if (req.user.id !== checkRecipeExists.dataValues.createdBy) {
        return errorResponse(
          res,
          401,
          'Unauthorized! This recipe cannot be edited because it was not created by you.',
        );
      }

      const updatedRecipe = await Recipes.update(
        { recipeName, ingredients },
        { where: { id: recipeId } },
      );

      return successResponse(
        res,
        200,
        'Recipe has been updated successfully',
        { recipeName, ingredients },
      );
    } catch (err) {
      return next(err);
    }
  }

  /**
   * delete A recipe
   * @param {object} req
   * @param {object} res
   * @returns {object} recipe object
   */
  static async deleteRecipe(req, res, next) {
    try {
      const { categoryId, recipeId } = req.params;
      const { id } = req.user;

      const checkCategoryExists = await Categories.findOne({ where: { id: categoryId } });
      if (!checkCategoryExists) {
        return errorResponse(res, 404, 'This category does not exist');
      }

      const checkRecipeExists = await Recipes.findOne({ id: recipeId });
      if (!checkRecipeExists) {
        return errorResponse(res, 404, 'This recipe was not found in the database');
      }

      if (id !== checkRecipeExists.dataValues.createdBy) {
        return errorResponse(
          res,
          401,
          'You cannot delete a recipe you did not create',
        );
      }

      const deletedRecipe = await Recipes.destroy({
        where: { id: recipeId },
      });

      return successResponse(res, 200, 'message', 'Recipe has been deleted successfully!');
    } catch (err) {
      return next(err);
    }
  }

  /**
   * get A recipe
   * @param {object} req
   * @param {object} res
   * @returns {object} recipe object
   */
  static async getRecipe(req, res, next) {
    try {
      const { categoryId, recipeId } = req.params;

      const checkCategoryExists = await Categories.findOne({ where: { id: categoryId } });
      if (!checkCategoryExists) {
        return errorResponse(res, 404, 'This category was not found in the database');
      }

      const checkRecipeExists = await Recipes.findOne({ where: { id: recipeId } });
      if (!checkRecipeExists) {
        return errorResponse(res, 404, 'This recipe was not found in the database');
      }
      return successResponse(res, 201, 'Recipe', checkRecipeExists);
    } catch (err) {
      return next(err);
    }
  }
}

export default RecipeController;
