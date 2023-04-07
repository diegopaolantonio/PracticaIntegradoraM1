import mongoose from "mongoose";

const messageCollection = "Messages";

const messageSchema = new mongoose.Schema({
    // id: {
    //     type: Number,
    //     required: true
    // },
    user: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    date: Date,
});

const messageModel = mongoose.model(messageCollection, messageSchema);

export { messageModel };