import { Server } from "socket.io";
import ProductManager from "./dao/dbManagers/ProductManager.js";
import MessageManager from "./dao/dbManagers/MessageManager.js";

const socket = {};
const productManager = new ProductManager();
const messageManager = new MessageManager();

socket.connect = function (httpServer) {
  socket.io = new Server(httpServer);

  let { io } = socket;

  //Conexion con el servidor
  io.on("connection", async (socket) => {
    console.log("Cliente conectado");

    let products = await productManager.getProducts();
    io.emit("getProduct", products);

    let messages = await messageManager.getMessages();
    io.emit("getMessages", messages);

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
      products = await productManager.getProducts();
      io.emit("getProduct", products);
    });

    // Agregar mensaje
    socket.on("addMessage", async (message) => {
      const messages = await messageManager.addMessage(message);
      io.emit("addMessage", messages);
    });

    // Actualizar vista en tiempo real
    socket.on("getMessages", async () => {
      messages = await messageManager.getMessages();
      io.emit("getMessages", messages);
    });
  });
};

export { socket };