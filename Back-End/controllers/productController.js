import Product from "../models/productModel.js";
import fs from 'fs';
import path from 'path';

// Add product
const addProduct = async (req, res) => {
  console.log('File:', req.file); // Debugging: Check if file is being received
  console.log('Body:', req.body); // Debugging: Check if form data is being received

  // Check if file is provided
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No image file provided" });
  }

  const imageFilename = req.file.filename;

  // Create a new product instance
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: imageFilename
  });

  try {
    // Save the product to the database
    await product.save();
    res.json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// List all products
const listProduct = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find({});
    res.json({ success: true, data: products });
  } catch (error) {
    console.error("Error listing products:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Remove product
const removeProduct = async (req, res) => {
  try {
    // Find the product by ID
    const product = await Product.findById(req.body.id);

    // Check if the product exists
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Delete the product image file
    const imagePath = path.join('uploads', product.image);
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
        // Proceed with deleting the product even if file deletion fails
      }
    });

    // Delete the product from the database
    await Product.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product removed successfully" });
  } catch (error) {
    console.error("Error removing product:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { addProduct, listProduct, removeProduct };
