const mongoose = require("mongoose")
const objectId = mongoose.Schema.Types.ObjectId

const bookSchema = mongoose.Schema({
    title:{
        type:String,
        required:"title is required",
        unique:true,
        trim:true
    },
    excerpt:{
        type:String,
        required:"excerpt is required",
        trim:true

    },
    userId:{
        type:objectId,
        ref:"User",
        required:true
    },
    ISBN:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    category:{
        type:String,
        required:"category is required",
        trim:true
    },
    subcategory:{
        type:String,
        required:"subcategory is required",
        trim:true
    },
    reviews:{
        type:Number,
        default:0,
        Comment:"Holds the number of reviews of this book"

    },
    deletedAt:{
        type:Date
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    releasedAt : {
        type : Date,
        required : true
    }
},
{timestamps:true})

module.exports=mongoose.model("bookModel",bookSchema)