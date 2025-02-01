import express from "express";

import { createProduct, deleteProduct, getProducts, updateProduct} from "../controllers/product.controller.js";

const router = express.Router();

// endpoint to create a new product
router.post("/", createProduct );

// endpoint to delete a product
router.delete("/:id", deleteProduct);

//endpoint to update a given product
router.put("/:id",updateProduct )

// endpoint to get all products
router.get("/" , getProducts )

export default router;
  