import { cartModel } from "../models/cartModel.js";
import { productModel } from "../models/productModel.js";
import ProductManager from "./ProductManager.js";

const productManager = new ProductManager();

export default class CartManager {
  constructor() {}

  // Funcion para obtener los datos del archivo carrito.jason
  getCarts = async () => {
    try {
      const carts = await cartModel.find();
      return carts;
    } catch (error) {
      console.log(error);
    }
  };

  // Funcion para obtener los datos de un cart especifico por el id
  getCartById = async (cartId) => {
    try {
      const carts = await cartModel.find({ _id: cartId });
      if (!carts) {
        return "Id not found";
      }
      return carts;
    } catch (error) {
      console.log(error);
    }
  };

  // Funcion para agregar un cart al arcihvo
  addCart = async () => {
    try {
      const created = await cartModel.create({ products: [] });
      return created;
    } catch (error) {
      console.log(error);
    }
  };

  // Funcion para agregar un producto por el id al cart undicado por su id
  updateCart = async (cartId, productId) => {
    let cartToUpdated;
    let elementsToUpdated = [];
    let cartProductsArray = [];
    let indexEncontrado = -1;

    try {
      const product = await productModel.find({ _id: productId });
      if (product.length === 0) {
        return "Product not exist";
      } else {
        const updated = await cartModel.find({ "_id": cartId });
        if (updated.length === 0) {
          return "Cart not found";
        } else {
          cartToUpdated = await cartModel.find({ "_id": cartId });
          
          cartToUpdated.forEach((element, index) => {
            elementsToUpdated = element.products;
            element.products.forEach((element, index) => {
              cartProductsArray[index] = element.product;
            });
          });

          // const grosso = await cartModel.find({ _id: cartId });
          if (cartProductsArray.length === 0) {
            elementsToUpdated = {
              product: productId,
            quantity: 1,
          };
          } else {
            cartProductsArray.forEach((element, index) => {
              if (element === productId) {
                indexEncontrado = index;
              }});
              if (indexEncontrado === -1) {
                const newProduct = {
                  product: productId,
                  quantity: 1,
                      };
                      elementsToUpdated.push(newProduct);
              } else {
                elementsToUpdated[indexEncontrado].quantity++;
              }
          }

          const updatedCart = await cartModel.updateOne({"_id": cartId}, {"products": elementsToUpdated});
          console.log(updatedCart);
          return updatedCart;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
}
