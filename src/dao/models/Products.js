import mongoose from "mongoose";

const collection = 'Products'
const schema = {
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    timestamp: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        default: 10
    }
}

const genericTimeStamps = {timestamps:{createdAt:'created_at',updatedAt:'updated_at'}}

const productsSchema = new mongoose.Schema(schema, genericTimeStamps)
const productsModel = mongoose.model(collection, productsSchema);

export default productsModel;