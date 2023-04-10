import { messageModel } from "../models/messageModel.js";

export default class MessageManager {
  constructor() {}

  //Funcion para obtener todos los datos del archivo mensajes.json
  getMessages = async () => {
    try {
      const messages = await messageModel.find();
      return messages;
    } catch (error) {
      console.log(error);
    }
  };

  // Funcion para agregar un mensaje al archivo
  addMessage = async (message) => {
    try {
      const createdMessage = await messageModel.create(message);
      console.log(createdMessage);
      return createdMessage;
    } catch (error) {
      console.log(error);
    }
  };
}
