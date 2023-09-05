import { Router } from "express";
import ProductManager from "../ProductManager.js";

const productRouter = Router();
const listaProductos = new ProductManager("./src/productos.json");

productRouter.get("/", (req, res) => {
  const products = listaProductos.getProducts();
  res.status(200).send(products);
});

productRouter.get("/:pid", (req, res) => {
  const { pid } = req.params;

  const result = listaProductos.getProductByID(pid);

  if (result.id) {
    res.status(200).send(result);
  } else {
    res.status(400).send(result);
  }
});

productRouter.post("/", (req, res) => {
  const {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  } = req.body;

  const product = {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  };
  const result = listaProductos.addProduct(product);
  res.status(200).send(result);
});

productRouter.put("/:pid", (req, res) => {
  const { pid } = req.params;
  const {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  } = req.body;

  const result = listaProductos.updateProduct(pid, {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  });

  if (result.err) {
    res.status(400).send(result);
  } else {
    res.status(200).send(result);
  }
});

productRouter.delete("/:pid", (req, res) => {
  const { pid } = req.params;

  const result = listaProductos.deleteProduct(pid);

  if (result.err) {
    res.status(400).send(result);
  } else {
    res.status(200).send(result);
  }
});

export default productRouter;
