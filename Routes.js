const express = require("express");
const { createVegProducts, getAllProducts, createNonVegProducts,
     getAllNonVegProducts, createSnacks, getAllSnacks, createDesserts,
     getAllDesserts, getAllDrinks, createDrinks, getAllOrders,
     createOrders, 
     userRegister,
     userLogin} = require("./Controller");
const verifyToken = require("./authentication");


const router = express.Router();


router.post("/register",userRegister)
router.post("/login",userLogin)
router.use(verifyToken);


router.post("/saveall", createVegProducts);

// Fetch all products
router.get("/getAll", getAllProducts);

router.post("/savenonveg", createNonVegProducts);
router.get("/getnonveg", getAllNonVegProducts);

router.post("/savesnacks", createSnacks);
router.get("/getsnacks", getAllSnacks);

// Insert all desserts
router.post("/savedesserts", createDesserts);

// Get all desserts
router.get("/getdesserts", getAllDesserts);

// Insert all drinks
router.post("/savedrinks", createDrinks);

// Get all drinks
router.get("/getdrinks", getAllDrinks);

//order saved url
router.post('/createOrder',createOrders);
//get the orders details

router.get("/getorders",getAllOrders);





module.exports = router;
