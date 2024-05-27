const mongoose = require('mongoose')// it is an object
// Schema
const reviewSchema = new mongoose.Schema({
    rating:{
        type:Number,
        min:0,
        max:5
    },
    comment:{
        type:String,
        trim:true
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Review'
        }
    ]
},{ timestamps: true });
// Model/Collection -> JS class -> objects/document
// model -> Singular & Capital Letter

let Review = mongoose.model('Review', reviewSchema);
module.exports = Review;