import { Op } from 'sequelize';
import ServerResponse from '../utils/responseHandler';
import models from '../database/models';

const {
  Categories,
  Recipes,
} = models;
const { successResponse, errorResponse } = ServerResponse;

/**
 *
 *
 * @export
 * @class Search Controller
 */
class SearchController {
/**
 * perform custom search sitewide
 *
 * @param {Object} req Express request
 * @param {Object} res Express object
 * @param {Object} next Express object
 * @returns {Array} categorySearch, recipeSearch
 */
  static async customSearch(req, res, next) {
    try {
      const {
        keyword, filter,
      } = req.query;
      if (keyword === '') {
        return errorResponse(res, 400, { message: 'Please input a search parameter' });
      }
      const categoryAtttributes = [
        'id',
        'categoryName',
        'description',
        'createdBy',
        'createdAt',
        'updatedAt',
      ];

      const recipeAttributes = ['id', 'recipeName', 'ingredients', 'createdBy', 'createdAt', 'updatedAt'];

      // custom filter is either category or recipe
      const categorySearch = await Categories.findAll({
        attributes: categoryAtttributes,
        where: {
          categoryName: {
            [Op.iLike]: `%${keyword}%`,
          },
        },
        order: [
          ['createdAt', 'DESC'],
        ],
      });
      const recipeSearch = await Recipes.findAll({
        attributes: recipeAttributes,
        where: {
          recipeName: {
            [Op.iLike]: `%${keyword}%`,
          },
        },
        order: [
          ['createdAt', 'DESC'],
        ],
      });
      if (filter === 'category') {
        return successResponse(res, 200, 'matches', {
          categorySearch,
        });
      }

      if (filter === 'recipe') {
        return successResponse(res, 200, 'matches', {
          recipeSearch,
        });
      }
      return successResponse(res, 200, 'matches', {
        categorySearch,
        recipeSearch,
      });
    } catch (err) {
      return next(err);
    }
  }
}

export default SearchController;
