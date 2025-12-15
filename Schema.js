const { default: mongoose } = require("mongoose");

const productSchema= new mongoose.Schema({
   id:String,
   name:String,
   price:Number,
   ImageUrl:String,
   description:String,
});
module.exports=productSchema;