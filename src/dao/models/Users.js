import mongoose from "mongoose";

const collection = 'Users'

const schema = {
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        unique: true,
        required: true
    },
    phoneNumber: {
        type: Number
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    role: {
        type: String,
        default: "user"
    }
}

const genericTimeStamps = {timestamps:{createdAt:'created_at',updatedAt:'updated_at'}}

const userSchema = new mongoose.Schema(schema, genericTimeStamps)
const usersModel = mongoose.model(collection, userSchema);

export default usersModel;