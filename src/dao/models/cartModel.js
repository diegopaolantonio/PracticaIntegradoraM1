import mongoose from "mongoose";

const cartCollection = "Carts";

const cartSchema = new mongoose.schema ({
    // id: {
    //     type: Number,
    //     required: true
    // },
    products: {
        type: Array,
        default: []
    },
});

const cartModel = mongoose.model(cartCollection, cartSchema);

export { cartModel };