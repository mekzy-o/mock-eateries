import { Recipes, Cart } from '../database/models';
import ServerResponse from '../utils/responseHandler';
import checkEmptyObject from '../utils/checkEmptyObject';

const { errorResponse, successResponse } = ServerResponse;

/**
 *
 *
 * @export
 * @class CartController
 */
class CartController {
  /**
   * Create A cart to add recipe
   * @param {object} req
   * @param {object} res
   * @returns {object} cart object
   */
  static async addRecipeToCart(req, res, next) {
    try {
      const { recipeId } = req.params;
      const foundRecipe = await Recipes.findOne({ where: { id: recipeId } });

      if (checkEmptyObject(foundRecipe)) {
        return errorResponse(res, 404, { message: 'No recipe with that ID was found' });
      }

      const SearchCart = await Cart.findAndCountAll({ where: { recipeId } });

      const newCart = {
        recipeCount: SearchCart.count,
        recipeId,
        createdBy: req.user.id,
      };

      const addRecipe = await Cart.create(newCart);

      return successResponse(res, 201, 'You added Recipe successfully', addRecipe);
    } catch (err) {
      return next(err);
    }
  }
}

export default CartController;
