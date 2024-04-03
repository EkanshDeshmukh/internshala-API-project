const { catchAsyncError } = require("../middlewares/catchAsyncError");
const Student = require("../models/studentModel");
const ErrorHandler = require("../utils/errorHandler");
const { sendtoken } = require("../utils/sendToken");

exports.homepage = catchAsyncError(async (req, res, next) => {
  res.json({ message: "homepage" });
});

exports.currentUser = catchAsyncError(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  res.json({ student });
});

exports.studentsignup = catchAsyncError(async (req, res, next) => {
  const student = await new Student(req.body).save();
  sendtoken(student, 201, res);
  //res.status(200).json(Student)
});

exports.studentsignin = catchAsyncError(async (req, res, next) => {
  const student = await Student.findOne({ email: req.body.email }).exec();

  if (!student)
    return next(new ErrorHandler("Student Not Found with this email", 404));

  const isMatch = student.comparePassword(req.body.password);
  if (!isMatch) return next(new ErrorHandler("Wrong Credientials", 500));

  res.json(student);
});

exports.studentsignout = catchAsyncError(async (req, res, next) => {
  res.clearCookie("token");
  res.json({ message: "Successfully  signed out" });
});
