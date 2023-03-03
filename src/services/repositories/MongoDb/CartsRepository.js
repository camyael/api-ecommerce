import DaoMongoDb from '../../../dao/DaoMongoDb.js';
import cartsModel from '../../../dao/models/Carts.js'; 
import { logger } from '../../LoggerService.js';

export default class CartsRepositoryMongoDb extends DaoMongoDb {
    constructor() {
        super(cartsModel)
    }

    async newCart ( timestamp ) {
        const newCart = {
            "timestamp" : timestamp,
            "products" : []
        }
        const result = await this.collection.create(newCart)
        return result.id
    }

    async deleteCart ( id ) {
        const findCart = await this.collection.find({_id: id})
        if (!findCart) logger.error(`Carrito ${id} no encontrado`)
        else {
            const result = await this.collection.deleteOne({_id: id})
            logger.info(result)
        }
    }

    async postInCart ( id, prod ) {
        const findCart = await this.collection.findById(id)
        let productos = findCart.products
        const idArray = productos.map( e => e.id)
        const indice = idArray.indexOf(prod.id)

        if (indice != -1) {
            const update = productos.find(e => e.id == prod.id)
            let qntifyold = update.quantify
            const actualizado = productos.map(e => {
                return {
                    id: e.id,
                    quantify: e.quantify
                }
            })
            actualizado[indice].quantify = qntifyold + prod.quantify
            const result = await this.collection.updateOne({_id: id}, {$set: {products: actualizado}})
            return result
        } else {
            const result = await this.collection.updateOne({_id: id}, {$push: {products: prod}})
            return result
        }
    }

    async deleteProducts ( idCart, idProd ) {
        const cart = await this.collection.findById(idCart)
        let prodArray = cart.products
        const delID = prodArray.map( e => e.id )
        const indice = delID.indexOf(idProd)
        prodArray.splice(indice, 1)
        const result = await this.collection.updateOne({_id: idCart}, {$set: {products: prodArray}})
        logger.info(result)
    }    
}