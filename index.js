require('dotenv').config('./.env');

const express = require('express');
const app = express()



const logger = require('morgan');
app.use(logger('tiny'));

app.use('/', require('./routes/indexRoute') )
//error Handling
const {generatedError} = require('./middlewares/error')
const ErrorHandler = require('./utils/errorHandler');
app.all('*',(req,res,next)=>{
    next(new ErrorHandler(`requested URL Not Found ${req.url}`,404))
})
app.use(generatedError)

app.listen(process.env.PORT,()=>{
    console.log(`Server is Running on port ${ process.env.PORT}`);
})