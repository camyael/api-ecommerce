import mongoose from "mongoose";

const collection = 'Carts'
const schema = {
    timestamp: {
        type: String,
        required: true
    },
    products: {
        type: Array,
        default: []
    }
}

const genericTimeStamps = {timestamps:{createdAt:'created_at',updatedAt:'updated_at'}}

const cartsSchema = new mongoose.Schema(schema, genericTimeStamps)
const cartsModel = mongoose.model(collection, cartsSchema);

export default cartsModel;