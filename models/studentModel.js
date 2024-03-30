const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const studentModel = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "E-mail is required"],
      unique: true,
      lowercase: true,
      // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [4, "Min length 4 character's required"],
        maxLength: [10, "max length 10 character's"],
      },
  },
  { timestamps: true }
);
studentModel.pre("save", function (next) {
    if (!this.isModified("password")) {
      return next();
    }
  
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
    next();
  });
  
  studentModel.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };
 

const Student = mongoose.model("student", studentModel);
module.exports = Student;
