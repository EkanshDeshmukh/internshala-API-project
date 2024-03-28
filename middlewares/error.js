exports.generatedError = (err,req,res,next) =>{
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        message : err.message,
        errName : err.errName,
        //stack:err.stack
    })
}