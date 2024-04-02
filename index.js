require("dotenv").config({ path: "./.env" });

const express = require("express");
const app = express();

//db connection
require("./models/database").connectDatabase();

//logger
const logger = require("morgan");
app.use(logger("tiny"));

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//session and cookies
const session = require("express-session");
const cookieparser = require("cookie-parser");
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET,
  })
);
app.use(cookieparser());

app.use("/", require("./routes/indexRoute"));

//error Handling
const { generatedError } = require("./middlewares/error");
const ErrorHandler = require("./utils/errorHandler");
app.all("*", (req, res, next) => {
  next(new ErrorHandler(`requested URL Not Found ${req.url}`, 404));
});
app.use(generatedError);

app.listen(process.env.PORT, () => {
  console.log(`Server is Running on port ${process.env.PORT}`);
});
