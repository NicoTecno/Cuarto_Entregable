import fs from "fs";
import { Router } from "express";
// import ProductManager from "../controllers/productController.js";
import ProductManager from "../ProductManager.js";

const router = Router();
const productManager = new ProductManager("src/products.json");

router.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("home", { products: products });
});

router.get("/realtimeproducts", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("realTimeProducts", { products: products });
});

export default router;
