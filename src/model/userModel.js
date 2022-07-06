const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    title : {
        type : String,
        required : true,
        enum : ['Mr', 'Mrs', 'Miss']
    },
    name : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true,
        unique : true,
        match : "^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$"
    },
    email : {
        type : String,
        required : true,
        unique : true,
        match : "^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
    },
    password : {
        type : String,
        required : true,
        minlength : 8,
        maxlength : 15
    },
    address: {
        street: String,
        city: String,
        pincode: String
    }
},
{timestamp : true})

module.exports = mongoose.model("userModel", userSchema)