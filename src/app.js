import express from "express";
import handlebars from "express-handlebars";
import messagesRouter from "./routes/messages.router.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js"
import __dirname from "./utils.js"

const app = express();

app.use(express.json());

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.listen(8080, () => {
    console.log("Server on port 8080");
});

app.use("/api/messages", messagesRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);
