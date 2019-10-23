/* eslint-disable no-unused-vars */
import { Categories } from '../database/models';
import ServerResponse from '../utils/responseHandler';
import pagination from '../utils/pagination';

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
  static async createCategories(req, res, next) {
    try {
      const { categoryName, description } = req.body;
      const { id } = req.user;

      const newCategory = {
        createdBy: id,
        categoryName,
        description,
      };
      const createdCategory = await Categories.create(newCategory);

      return successResponse(
        res,
        201,
        'The Recipe Category was created successfully',
        createdCategory,
      );
    } catch (err) {
      return next(err);
    }
  }

  /**
   * Update A Recipe category
   * @param {object} req
   * @param {object} res
   * @returns {object} recipe category object
   */
  static async editCategories(req, res, next) {
    try {
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
        {
          where: { id },
        },
      );

      return successResponse(res, 200, 'Recipe Category Updated Successfully', { categoryName, description });
    } catch (err) {
      return next(err);
    }
  }

  /**
   * Delete a Recipe category
   * @param {object} req
   * @param {object} res
   * @returns {object} recipe category object
   */
  static async deleteCategories(req, res, next) {
    try {
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
        200,
        'message',
        'Recipe categories has been deleted Successfully',
      );
    } catch (err) {
      return next(err);
    }
  }

  /**
   * Get all Categories
   * @param {object} req
   * @param {object} res
   * @returns {object} recipe category object
   */
  static async getCategories(req, res, next) {
    const pageNumber = pagination(req.query.page, req.query.pageLimit);
    try {
      const getAllCategories = await Categories.findAll({
        offset: pageNumber.offset,
        limit: pageNumber.limit,
        subQuery: false,
      });
      return successResponse(
        res,
        201,
        'Recipe Category retrieved successfully',
        getAllCategories,
      );
    } catch (err) {
      return next(err);
    }
  }

  /**
   * Get Category by ID
   * @param {object} req
   * @param {object} res
   * @returns {object} recipe category object
   */
  static async getSingleCategory(req, res, next) {
    try {
      const { id } = req.params;
      const checkCategoryExists = await Categories.findOne({ where: { id } });
      if (!checkCategoryExists) {
        return errorResponse(
          res,
          404,
          'This category was not found in the database. Try Again!',
        );
      }
      return successResponse(
        res,
        201,
        'Recipe Category retrieved successfully',
        checkCategoryExists,
      );
    } catch (err) {
      return next(err);
    }
  }
}

export default CategoryController;
