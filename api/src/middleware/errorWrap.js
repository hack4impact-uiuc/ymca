/*
 * Middleware to allow us to safely handle errors in async/await code
 * without wrapping each route in try...catch blocks
 */
const errorWrap = (fn) => {
  return (req, res, next) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = errorWrap;
