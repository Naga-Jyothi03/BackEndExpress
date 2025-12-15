require("dotenv").config();
// importing the express module 
const express=require("express");
const { default: mongoose } = require("mongoose");
const router = require("./Routes");

 

//creating the instance express
const app=express();

const cors=require("cors");
app.use(cors());

app.use(express.static("public"));
app.use("/images", express.static("public/images"));


//middleware to pare json body
app.use(express.json());

//defining the base url
app.use("/api/v1/products",router);

const MONGO_URL="mongodb+srv://NagaJyothi:Nagajyothi123@cluster0.lhoee9z.mongodb.net/?appName=Cluster0";
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("DB Error:", err));


//start the server and listen on port number
app.listen(3000,()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
 