import { Router } from "express";
import ProductManager from "../dao/dbManagers/ProductManager.js";
import MessageManager from "../dao/dbManagers/MessageManager.js";

const router = Router();
const productManager = new ProductManager();
const messageManager = new MessageManager();

// Llamado a la vista con Handlebars
router.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("index", {
    productsArray: products,
  });
});

router.get("/messages", async (req, res) => {
  const messages = await messageManager.getMessages();
  res.render("chat", {
    messagesArray: messages,
  });
});

// Llamado a la vista con Socket
router.get("/realtimeproducts", async (req, res) => {
  res.render("realTimeProducts", {});
});

router.get("/realtimechat", async (req, res) => {
  res.render("realTimeChat", {});
});

export default router;
