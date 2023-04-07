import { Router } from "express";
import MessageManager from "../MessageManager.js";

const router = Router();
const messageManager = new MessageManager();

router.get("/", async (req, res) => {
    const messages = await messageManager.getMessages();
    console.log(messages);
    return res.send({ messages });
});

router.post("/", async (req, res) => {
    const message = req.body;
    const messages = await messageManager.addMessage(message);
    return res.send({ messages });
});

export default router;