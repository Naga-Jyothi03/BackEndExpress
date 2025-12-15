const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const productSchema = require("./Schema");
const orderSchema = require("./Orderschema");
const { userSchema } = require("./registrationSchema");

let productModel=mongoose.model("vegproducts",productSchema);
const addVegProducts = async (products) => {
  return await productModel.insertMany(products);
};

// Fetch all products
const fetchAllVegProducts = async () => {
  return await productModel.find();
};

let nonVegModel=mongoose.model("nonvegproducts",productSchema);
const addNonVegProducts = async (products) => {
  return await nonVegModel.insertMany(products);
};

// Fetch all non-veg products
const fetchAllNonVegProducts = async () => {
  return await nonVegModel.find();
};

let snacksModel=mongoose.model("snacks",productSchema);
const addSnacks = async (snacksArr) => {
  return await snacksModel.insertMany(snacksArr);
};

// Get all snacks
const fetchAllSnacks = async () => {
  return await snacksModel.find();
};

let dessertsModel=mongoose.model("desserts",productSchema);

// Save multiple desserts
const addDesserts = async (dessertsArray) => {
    return await dessertsModel.insertMany(dessertsArray);
};

// Fetch all desserts
const fetchAllDesserts = async () => {
    return await dessertsModel.find();
};

let drinksModel=mongoose.model("drinks",productSchema);

const addDrinks = async (drinksArray) => {
    return await drinksModel.insertMany(drinksArray);
};

const fetchAllDrinks = async () => {
    return await drinksModel.find();
};

let orderModel=mongoose.model("orders",orderSchema);
let createNewOrder=(orderDetails)=>{
     return new orderModel(orderDetails).save();
}
let fetchAllVegOrders=async()=>{
     return await orderModel.find();
}

let userModel=mongoose.model("User", userSchema);
let registerUser=(userDetails)=>{
     return new userModel(userDetails).save();

}


const loginUserService = async (email, password) => {
  const user = await userModel.findOne({ email });

  // If no user found
  if (!user) {
    return { status: false, message: "Invalid email or password" };
  }

  // Validate password
  const isValid = (password === user.password);

  if (!isValid) {
    return { status: false, message: "Invalid email or password" };
  }

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );

  return {
    status: true,
    message: "Login Successful",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,    
      address: user.address
    }
  };
};

module.exports = {
  addVegProducts,
  fetchAllVegProducts,
  addNonVegProducts,
  fetchAllNonVegProducts,
  addSnacks,
  fetchAllSnacks,
  addDesserts,
  fetchAllDesserts,
  addDrinks,
  fetchAllDrinks,
  createNewOrder,
  fetchAllVegOrders,
  registerUser,
  loginUserService
};