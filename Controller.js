const { addVegProducts, fetchAllVegProducts, addNonVegProducts,
   fetchAllNonVegProducts, fetchAllSnacks, addSnacks, fetchAllDesserts,
    addDesserts, fetchAllDrinks, addDrinks,
   fetchAllVegOrders, createNewOrder, 
   loginUserService,
   registerUser} = require("./Service");

const createVegProducts = async (req, res) => {
  try {
    const newProducts = req.body; // array of objects

    const saved = await addVegProducts(newProducts);

    res.status(201).json({
      message: "Veg products inserted successfully",
      data: saved,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error saving products",
      error: error.message,
    });
  }
};

// Get all veg products
const getAllProducts = async (req, res) => {
  try {
    const products = await fetchAllVegProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching products",
      error: error.message,
    });
  }
};

const createNonVegProducts = async (req, res) => {
    const newProducts = req.body;

    await addNonVegProducts(newProducts);
    res.send("product added successfully")
    
  }

// Get all non-veg products
const getAllNonVegProducts = async (req, res) => {
  
    const products = await fetchAllNonVegProducts();
    res.json(products);
};

const createSnacks = async (req, res) => {
 
    const newSnacks = req.body;  // array
    await addSnacks(newSnacks);

    res.send("snacks added successfully")
  
};

// Fetch all snacks
const getAllSnacks = async (req, res) => {
  try {
    const snacks = await fetchAllSnacks();
    res.status(200).json(snacks);
  } catch (error) {
    console.error("Error fetching snacks:", error);
    res.status(500).json({ error: "Failed to fetch snacks" });
  }
};

const createDesserts = async (req, res) => {
        const newDesserts = req.body; // array of items
        await addDesserts(newDesserts);

        res.send("deseets added successfully")
};

// Fetch desserts
const getAllDesserts = async (req, res) => {
  
        const desserts = await fetchAllDesserts();
        res.json(desserts)
}

const createDrinks = async (req, res) => {
        const newDrinks = req.body; // array of objects
         await addDrinks(newDrinks);

        res.send("drinks added successfully");
};

// Fetch drinks
const getAllDrinks = async (req, res) => {
   
        const drinks = await fetchAllDrinks();
        res.json(drinks)
};

const createOrders = async (req, res) => {
  try {
    console.log("getting order data here")
    const orderDetails = req.body;

    // Save in MongoDB
    const savedOrder = await createNewOrder(orderDetails);

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: savedOrder
    });

  } catch (error) {
    console.log("❌ Error creating order:", error);

    res.status(500).json({
      success: false,
      message: "Order failed",
      error: error.message
    });
  }
};

const getAllOrders=async (req,res)=>{
    const products=await fetchAllVegOrders();
    res.send(products);
}

const userRegister = (req, res) => {
    const userDetails = req.body;

    registerUser(userDetails)
        .then(() => {
            res.send("User registered successfully");
        })
        .catch((error) => {
            res.status(500).send("Error registering user: " + error.message);
        });
};


const userLogin = async (req, res) => {
  const { email, password } = req.body;

  const result = await loginUserService(email, password);

  return res.json({
    status: result.status,
    message: result.message,
    token: result.token,
    user: result.user
  });
};

module.exports = {
  createVegProducts,
  getAllProducts,
  createNonVegProducts,
  getAllNonVegProducts,
  createSnacks,
  getAllSnacks,
  createDesserts,
  getAllDesserts,
  getAllDrinks,
  createDrinks,
  createOrders,
  getAllOrders,
  userRegister,
  userLogin,
  
};