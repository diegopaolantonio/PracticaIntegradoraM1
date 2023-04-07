import fs from "fs";

export default class MessageManager {
  constructor() {
    this.path = "./files/mensajes.json";
  }

  //Funcion para obtener todos los datos del archivo mensajes.json
  getMessages = async () => {
    if (fs.existsSync(this.path)) {
      const fileData = await fs.promises.readFile(this.path, "utf-8");
      const result = JSON.parse(fileData);
      return result;
    } else {
      return [];
    }
  };

  // Funcion para agregar un mensaje al archivo
  addMessage = async (message) => {
    let messages = await this.getMessages();

    if (messages.length === 0) {
      message.id = 1;
    } else {
      message.id = messages[messages.length - 1].id + 1;
    }

    messages.push(message);

    const string = JSON.stringify(messages, null, "\t");

    await fs.promises.writeFile(this.path, string);
    return message;
  };
}
