import { Products, Carts } from "../dao/Factory.js";

const administrator = true;
const productos = await new Products;
const cart = await new Carts;

const viewProducts = async (req, res) => {
    // listar todos los productos disponibles
    const allProducts = await productos.getAll()
    if(!allProducts) return res.status(400).send({status: "error", error: "No se pudo traer todos los productos"})
    res.send({status: "success", payload: allProducts})
}

const viewCarts = async (req, res) => {
    const allCarts = await cart.getAll()
    if(!allCarts) return res.status(400).send({status: "error", error: "No se pudo traer todos los carritos"})
    res.send({status: "success", payload: allCarts})
}

export default {
    viewProducts,
    viewCarts
}