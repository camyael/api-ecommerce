import mongoose from "mongoose";

const collection = 'chatHistorial'
const schema = {
    author: {
        mail : {
            type: String,
            required: true
        },
        first_name : {
            type: String,
            required: true
        },
        last_name : {
            type: String,
            required: true
        },
        alias : {
            type: String,
            required: true
        },
        avatar : {
            type: String,
            required: true
        },
        age : {
            type: Number,
            require: true
        }
    },
    message: {
        timestamp : {
            type: String,
            required: true
        },
        text : {
            type: String,
            required: true
        }
    }
}

const genericTimeStamps = {timestamps:{createdAt:'created_at',updatedAt:'updated_at'}}

const chatSchema = new mongoose.Schema(schema, genericTimeStamps)
const chatModel = mongoose.model(collection, chatSchema);

export default chatModel;