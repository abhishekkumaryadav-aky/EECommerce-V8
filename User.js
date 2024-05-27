// const { string } = require('joi');
const mongoose = require('mongoose')// it is an object
const passportLocalMongoose = require('passport-local-mongoose');

// Schema
const userSchema = new mongoose.Schema({
   // username - PLM(Passport-local-mongoose)
   // password - PLM
   email:{
    type:String,
    trim:true,
    required:true
   },
   role:{
      type:String,
      default:"buyer",
   },
   gender:{
    type:String,
    trim:true,
    requird:true,
   },
   wishlist:[
      {
         type:mongoose.Schema.Types.ObjectId,
         ref:"Product",
      },
   ],
   cart:[{
         type:mongoose.Schema.Types.ObjectId,
         ref:"Product",
      },],
});

userSchema.plugin(passportLocalMongoose); // Always apply on Schema




// Model/Collection -> JS class -> objects/document
// model -> Singular & Capital Letter

let User = mongoose.model('User', userSchema);
module.exports = User;