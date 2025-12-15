const { default: mongoose } = require("mongoose");

const orderSchema=new mongoose.Schema(
    {items:[
       { id:String,
         name:String,
         price:Number,
         quantity:Number,
         ImageUrl:String,
         description:String
     }, ],
     totalAmount:{
        type:Number
     },
     orderDate:{
        type:Date,
        default:Date.now()
     },
},
{ timestamps:true }
);

module.exports=orderSchema;