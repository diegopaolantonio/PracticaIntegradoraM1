import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import messagesRouter from "./routes/messages.router.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import ProductManager from "./ProductManager.js";
import MessageManager from "./MessageManager.js";
import __dirname from "./utils.js";

const app = express();
const productManager = new ProductManager();
const messageManager = new MessageManager();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(`${__dirname}/public`));

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

const httpServer = app.listen(8080, () => {
  console.log("Server on port 8080");
});

app.use("/api/messages", messagesRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

const io = new Server(httpServer);

//Conexion con el servidor
io.on("connection", async (socket) => {
  console.log("Cliente conectado");
  let products = await productManager.getProducts();
  io.emit("getProduct", products);

  // Agregar producto
  socket.on("addProduct", async (product) => {
    products = await productManager.addProduct(product);
    io.emit("addProduct", products);
  });

  // Eliminar producto
  socket.on("deleteProduct", async (pid) => {
    products = await productManager.deleteProduct(parseInt(pid));
    io.emit("deleteProduct", products);
  });

  // Actualizar vista en tiempo real
  socket.on("getProduct", async () => {
    let products = await productManager.getProducts();
    io.emit("getProduct", products);
  });

  // Agregar mensaje
  socket.on("addMessage", async (message) => {
    messages = await messageManager.addMessage(message);
    io.emit("addMessage", messages);
  });

  // Actualizar vista en tiempo real
  socket.on("getMessages", async () => {
    let messages = await messageManager.getMessages();
    io.emit("getMessages", messages);
  });
});
