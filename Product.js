const mongoose = require('mongoose')// it is an object
// Schema
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    img:{

    },
    price:{
        type:Number,
        min:0,
        required:true
    },
    desc:{
        type:String,
        trim:true
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Review'
        }
    ],
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }

})
// Model/Collection -> JS class -> objects/document
// model -> Singular & Capital Letter

let Product = mongoose.model('Product', productSchema);

module.exports = Product;