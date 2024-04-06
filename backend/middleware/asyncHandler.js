// A middleware to handle asynchronous functions and catch any errors that may occur
const asyncHandler = (fn) => (req, res, next) =>
  // Wrapping the asynchronous function in a Promise to handle any potential errors
  Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHandler;