exports.generatedError = (err,req,res,next) =>{
    const statusCode = err.statusCode || 500;

         if(err.name === "MongoServerError" && err.message.includes('E11000 duplicate key')){
             err.message = "Student already exists in the database";
        }  

    res.status(statusCode).json({
        message : err.message,
        errName : err.errName,
        //stack:err.stack
    })
}