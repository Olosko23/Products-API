const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/product");

const app = express();
const PORT = process.env.PORT || 5000;
const DB = process.env.MONGO_URL;
app.use(cors());
mongoose.set("strictQuery", false);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//---------------//

mongoose
  .connect(DB)
  .then(() => {
    console.log("Mongo DB Connection Successful");
  })
  .catch((error) => {
    console.log({ message: error.message });
  });

//--------------//
//Routes
app.get("/", (req, res) => {
  res.status(200).json("Welcome to the API");
});

//GET ALL
app.get("/products", async (req, res) => {
  try {
    const product = await Product.find({});
    res.status(200).json(product);
  } catch (error) {
    console.log({ message: error.message });
  }
});

//GET ONE
app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    console.log({ message: error.message });
  }
});

//CREATE
app.post("/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.log({ message: error.message });
  }
});

//UPDATE
app.patch("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    res.status(201).json(product);
  } catch (error) {
    console.log({ message: error.message });
  }
});

//DELETE
app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    res.status(201).json(product);
  } catch (error) {
    console.log({ message: error.message });
  }
});
//--------------//
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}....`);
});
