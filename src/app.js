import express from "express";
import messagesRouter from "./routes/messagesRouter.js";
import viewsRouter from "./routes/viewsRouter.js"
import __dirname from "./utils.js"

const app = express();

app.use(express.json());

app.listen(8080, () => {
    console.log("Server on port 8080");
});

app.use("/api/messages", messagesRouter);
app.use("/", viewsRouter);
