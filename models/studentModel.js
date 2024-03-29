const mongoose = require('mongoose');

const studentModel = new mongoose.Schema({
    email:{
        type:'string',
        required:[true,"E-mail is required"],
        unique:true,
        lowercase:true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password:{
        type:'string',
        required:[true,"Password is required"],
        validate: [validatePassword, 'Please fill a valid password'],
        minLength:[4,"Min length 4 character's required"],
        maxLength:[10,"max length 10 character's"],

    },
},{timestamps:true})


module.exports = mongoose.model('student',studentModel)