import express from 'express';
import multer from 'multer';
import { addProduct, listProduct, removeProduct } from '../controllers/productController.js';

// Create a new router instance
const productRouter = express.Router();

// Set up Multer storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Ensure 'uploads' directory exists and is writable
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage });

// Define routes
productRouter.post('/add', upload.single('image'), addProduct);
productRouter.get('/list', listProduct);
productRouter.post('/remove', removeProduct);

export default productRouter;
