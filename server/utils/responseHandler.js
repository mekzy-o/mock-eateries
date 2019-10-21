/**
 *Server Response module
 *
 * @export
 * @class ServerResponse
 */
export default class ServerResponse {
  /**
   *Server response for an errored request
   *
   * @static
   * @param {object} res
   * @param {number} status
   * @param {object} error
   * @returns {object} error
   * @memberof ServerResponse
   */
  static errorResponse(res, status, error) {
    return res.status(status).json({
      errors: error,
    });
  }

  /**
   *Server response for a successful request
   *
   * @static
   * @param {object} res
   * @param {number} status
   *  @param {string} key
   * @param {object} data
   * @returns {object} - data
   * @memberof ServerResponse
   */
  static successResponse(res, status, key, data) {
    return res.status(status).json({
      [key]: data,
    });
  }

  /**
   *Error when a requested resource is not found
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} errors
   * @memberof ServerResponse
   */
  static notFoundError(req, res) {
    return res.status(404).json({
      errors: { message: 'Resource not found' },
    });
  }
}
