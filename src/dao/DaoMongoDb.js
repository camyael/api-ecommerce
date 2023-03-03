import mongoose from "mongoose";
import config from "../config/config.js";
import { logger } from "../services/LoggerService.js"

class DaoMongoDb {
    constructor(collection) {
        this.collection = collection;
        mongoose.set('strictQuery', true);
        const connection = mongoose.connect(`${config.mongo.url}`, error => {
            if (error) logger.error(`Error al conectar a ${config.mongo.db}` + error);
            else logger.info(`Se conectó a ${config.mongo.db}`)
        })
    }

    async getAll () {
        return await this.collection.find()
    }

    async getById ( id ) {
        try {
            const result = await this.collection.findById(id)
            return result
        } catch {
            return logger.error(`No existe ${id}`)
        }
    }

    async disconnect () {
        mongoose.connection.close()
    }
}

export default DaoMongoDb;