// import fs from "fs";

// class Producto {
//   static idIncremental = 0;
//   constructor(title, description, price, thumbnail, code, stock) {
//     this.title = title;
//     this.description = description;
//     this.price = price;
//     this.thumbnail = thumbnail;
//     this.code = code;
//     this.stock = stock;
//     this.id = Producto.idIncremental;
//     Producto.idIncremental++;
//   }
// }

// class ProductManager {
//   #arr;

//   constructor(path) {
//     this.#arr = [];
//     this.path = path;
//     if (!fs.existsSync(path)) {
//       fs.writeFileSync(path, "[]", "utf-8");
//     } else {
//       this.loadProductsFromJSON();
//     }
//   }

//   addProduct(...params) {
//     console.log("ADDPRODUCTTT");
//     console.log(params);
//     if (params.length !== 6) {
//       console.error("Error: Incorrect number of parameters");
//       return;
//     }

//     const [title, description, price, thumbnail, code, stock] = params;
//     if (this.codigoExiste(code)) {
//       console.error(`Error : Codigo ya existe`);
//       return;
//     }

//     const nuevoProducto = new Producto(
//       title,
//       description,
//       price,
//       thumbnail,
//       code,
//       stock
//     );
//     this.#arr.push(nuevoProducto);
//     this.updateJSONFile();
//   }

//   loadProductsFromJSON() {
//     const jsonData = fs.readFileSync(this.path, "utf-8");
//     const products = JSON.parse(jsonData);
//     products.forEach((product) => {
//       const { title, description, price, thumbnail, code, stock } = product;
//       this.addProduct(title, description, price, thumbnail, code, stock);
//     });
//   }

//   updateJSONFile() {
//     const jsonStr = JSON.stringify(this.#arr, null, 2);
//     fs.writeFileSync(this.path, jsonStr, "utf-8");
//     console.log("The JSON file has been updated.");
//   }

//   deleteProduct(id) {
//     const posicionProductoEliminar = this.#arr.findIndex(
//       (obj) => obj.id === id
//     );
//     if (posicionProductoEliminar !== -1) {
//       this.#arr.splice(posicionProductoEliminar, 1);
//       this.updateJSONFile();
//     }
//   }

//   updateProduct(id, title, description, price, thumbnail, code, stock) {
//     const productoModificar = this.getProductById(id);
//     if (!(productoModificar instanceof Producto)) {
//       return;
//     }

//     productoModificar.title = title ?? productoModificar.title;
//     productoModificar.description =
//       description ?? productoModificar.description;
//     productoModificar.price = price ?? productoModificar.price;
//     productoModificar.thumbnail = thumbnail ?? productoModificar.thumbnail;
//     productoModificar.code = code ?? productoModificar.code;
//     productoModificar.stock = stock ?? productoModificar.stock;
//     this.updateJSONFile();
//   }

//   getProducts() {
//     return this.#arr;
//   }

//   getProductById(id) {
//     const productoEncontrado = this.#arr.find((producto) => producto.id === id);
//     return productoEncontrado ? productoEncontrado : null;
//   }

//   codigoExiste = (code) => {
//     if (this.#arr.find((producto) => producto.code == code)) return true;
//     return false;
//   };
// }

// export default ProductManager;

//////////////////////////////////////////////////////////
import fs from "fs";

export default class ProductManager {
  constructor(path) {
    this.path = path;
  }

  addProduct = async (product) => {
    const products = await this.getProducts();

    if (
      !product.title ||
      !product.description ||
      !product.code ||
      !product.price ||
      !product.stock ||
      !product.category
    ) {
      console.log(
        "ERROR: Can't add this product because contain an empty value"
      );
    } else {
      product.status = true;

      if (products.length === 0) {
        product.id = 1;
      } else {
        product.id = products[products.length - 1].id + 1;
      }

      products.push(product);

      await fs.promises.writeFile(
        `./${this.path}`,
        JSON.stringify(products, null, "\t")
      );

      return product;
    }
  };

  getProducts = async () => {
    if (fs.existsSync(`./${this.path}`)) {
      const data = await fs.promises.readFile(`./${this.path}`, "utf-8");
      const products = JSON.parse(data);
      return products;
    } else {
      return [];
    }
  };

  getProductById = async (pid) => {
    if (fs.existsSync(`./${this.path}`)) {
      const data = await fs.promises.readFile(`./${this.path}`, "utf-8");
      const products = JSON.parse(data);
      let productMatched = products.find((product) => product.id == pid);

      if (productMatched == undefined) {
        return -1;
      } else {
        return productMatched;
      }
    } else {
      return -1;
    }
  };

  updateProduct = async (aId, product) => {
    const products = await this.getProducts();

    if (products.length === 0) {
      return "Empty file: Can not update a product";
    } else {
      let productById = await this.getProductById(aId);
      if (productById == -1) {
        return -1;
      } else {
        product.id = productById.id;
        products[productById.id - 1] = product;
        await fs.promises.writeFile(
          `./${this.path}`,
          JSON.stringify(products, null, "\t")
        );
        return product;
      }
    }
  };

  deleteProductById = async (pid) => {
    if (fs.existsSync(`./${this.path}`)) {
      const products = await this.getProducts();
      let productMatched = products.find((product) => product.id == pid);

      if (productMatched == undefined) {
        return -1;
      } else {
        const newArrayProducts = products.filter(
          (product) => product.id != pid
        );

        await fs.promises.writeFile(
          `./${this.path}`,
          JSON.stringify(newArrayProducts, null, "\t")
        );
        return newArrayProducts;
      }
    } else {
      return -1;
    }
  };
}
