/* eslint-disable no-param-reassign */
/**
 *
 * @param {number} offset - offset number
 *
 * @param {number} limit - limit number
 *
 * @returns {object} pagination - with the limit and offset fields
 * to query database
 */

const pagination = (page, pageLimit) => {
  if (!page) {
    page = 1;
  }
  if (!pageLimit) {
    pageLimit = 10;
  }
  const offset = (page - 1) * pageLimit;
  const limit = pageLimit;
  return {
    offset,
    limit,
  };
};
export default pagination;
