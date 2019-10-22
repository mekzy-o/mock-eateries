import { Categories } from '../database/models';
import ServerResponse from '../utils/responseHandler';

const { errorResponse, successResponse } = ServerResponse;

/**
 *
 *
 * @export
 * @class CategoryController
 */
class CategoryController {
  /**
 * Create A category for recipe
 * @param {object} req
 * @param {object} res
 * @returns {object} recipe category object
 */
  static async createCategories(req, res) {
    const { category, description } = req.body;
    const { id } = req.user;

    const newCategory = {
      createdBy: id,
      category,
      description,
    };
    const createdCategory = await Categories.create(newCategory);

    successResponse(
      res,
      201,
      'The Recipe Category was created successfully',
      createdCategory,
    );
  }

  /**
   * Update A Recipe category
   * @param {object} req
   * @param {object} res
   * @returns {object} recipe category object
   */
  static async editCategories(req, res) {
    const { categoryName, description } = req.body;
    const { id } = req.params;

    const checkCategoryExists = await Categories.findOne({ where: { id } });
    if (!checkCategoryExists) {
      return errorResponse(
        res,
        404,
        'The category was not found in the database',
      );
    }

    // Update category if it is found
    const updatedCategory = await Categories.update(
      { categoryName, description },
      { where: { id } },
    );

    return successResponse(
      res,
      201,
      'Recipe category has been updated',
      updatedCategory,
    );
  }

  /**
   * Delete a Recipe category
   * @param {object} req
   * @param {object} res
   * @returns {object} recipe category object
   */
  static async deleteCategories(req, res) {
    const { id } = req.params;
    const checkCategoryExists = await Categories.findOne({ where: { id } });
    if (!checkCategoryExists) {
      return errorResponse(res, 404, 'This category does not exist');
    }
    const deleteCategory = await Categories.destroy({
      where: {
        id,
      },
    });
    return successResponse(
      res,
      201,
      'Recipe category has been deleted Successfully',
      deleteCategory,
    );
  }

  /**
   * Get Category by ID
   * @param {object} req
   * @param {object} res
   * @returns {object} recipe category object
   */
  static async getCategories(req, res) {
    const { id } = req.params;
    const checkCategoryExists = await Categories.findOne({ id });
    if (!checkCategoryExists) {
      return errorResponse(res, 404, 'This category was not found in the database. Try Again!');
    }
    return successResponse(res, 201, 'Recipe Category retrieved successfully', checkCategoryExists);
  }
}

export default CategoryController;
