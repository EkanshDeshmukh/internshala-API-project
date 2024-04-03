const jwt = require("jsonwebtoken");
const errorHandler = require("../utils/errorHandler");
const { catchAsyncError } = require("./catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");

exports.isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(
      new ErrorHandler("please login in to access the resource", 401)
    );
  }

  const { id } = jwt.verify(token, process.env.JWT_SECRET);
  req.id = id 
  next();
});
