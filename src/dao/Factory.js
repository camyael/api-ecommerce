// import mongoose from 'mongoose';
import config from '../config/config.js';
import { logger } from '../services/LoggerService.js';

const PERSISTENCIA = config.app.persistence;

let Products;
let Carts;
let Chat;
let Users;

if (PERSISTENCIA === "FILESYSTEM") {
    const {default:ProductsDAO} = await import('../services/repositories/FileSystem/ProductsRepository.js');
    const {default:CartsDAO} = await import('../services/repositories/FileSystem/CartsRepository.js');
    Products = ProductsDAO;
    Carts = CartsDAO;
} else if (PERSISTENCIA === "MONGODB") {
    const {default:ProductsDAO} = await import('../services/repositories/MongoDb/ProductsRepository.js');
    const {default:CartsDAO} = await import('../services/repositories/MongoDb/CartsRepository.js');
    const {default:ChatDAO} = await import('../services/repositories/MongoDb/ChatRepository.js');
    const {default:UsersDAO} = await import('../services/repositories/MongoDb/UsersRepository.js');
    Products = ProductsDAO,
    Carts = CartsDAO,
    Chat = ChatDAO,
    Users = UsersDAO
} else {
    logger.error(`Error al conectar con ${PERSISTENCIA}`)
}

export { Products, Carts, Chat, Users }