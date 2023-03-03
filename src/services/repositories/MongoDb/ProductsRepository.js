import DaoMongoDb from "../../../dao/DaoMongoDb.js";
import productsModel from "../../../dao/models/Products.js";

export default class ProductsRepositoryMongoDb extends DaoMongoDb {
    constructor() {
        super(productsModel)
    }

    async save ( add , date ) {
        const code = Math.floor(Math.random() * 99999)
        add.timestamp = date
        add.code = code
        const result = await this.collection.create(add)
        return result
    }

    async putById ( id , datos) {
        const result = await this.collection.updateOne({_id: id}, {$set: {price: datos}})
        return result;
    }

    async deleteById ( id ) {
        const result = await this.collection.deleteOne({_id: id})
        return result
    }
}