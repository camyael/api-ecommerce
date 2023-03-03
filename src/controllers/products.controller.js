import config from "../config/config.js";
import ProductsDTO from "../dao/dto/Products.dto.js";
import { Products } from "../dao/Factory.js";

const productos = new Products;
const PORT = config.app.port || 8080;

const getAll = async (req, res) => {
    const allProducts = await productos.getAll()
    res.send({status: "success", payload: allProducts})
}

const newProd = async (req, res) => {
    // incorporar productos al listado (disponible para administradores)
    const { title, description, price } = req.body
    const date = new Date().toLocaleString();
    if(!title||!price||!description) return res.status(400).send({status:"error",error:"Incomplete values"});
    if(!req.file) {
        const result = ProductsDTO.newProductDto({
            title,
            description,
            price
        })
        const product = await productos.save(result, date)
        return res.send({status: "success", payload: product})
    }
    const image = req.protocol+"://"+req.hostname+':'+PORT+'/images/products/'+req.file.filename;
    const result = ProductsDTO.newProductDto({
        title,
        description,
        price,
        image
    })
    const product = await productos.save(result, date)
    res.send({status: "success", payload: product})
}

const prodById = async (req, res) => {
    // un producto por su id (disponible para usuarios y administradores)
    const id = req.params.pid
    const result = await productos.getById(id)
    if(!result) return res.status(400).send({status: "error", error: "No existe el producto"})
    res.send({status: "success", payload: result})
}

const updateProd = async (req, res) => {
    // actualiza un producto por su id (disponible para administradores)
    const id = req.params.pid
    const updateData = req.body.price
    const product = await productos.getById(id)
    if(!product) return res.status(400).send({status: "error", error: "Producto para actualizar no encontrado"})
    const result = await productos.putById( id, updateData)
    res.send({status: "success", payload: "Producto actualizado"})
}

const deleteProd = async (req, res) => {
    // borra un producto por su id (disponible para administradores)
    if(req.params.pid) {
        const pid = req.params.pid
        const result = await productos.deleteById(pid)
        if (!result) return res.status(400).send({status: "error", error: "No se pudo borrar el producto"})
        res.send({status: 'success', payload: 'Producto borrado'})
    } else if (req.body) {
        const { pid } = req.body
        const result = await productos.deleteById(pid)
        if (!result) return res.status(400).send({status: "error", error: "No se pudo borrar el producto"})
        res.send({status: 'success', payload: 'Producto borrado'})
    }
}

export default {
    getAll,
    newProd,
    prodById,
    updateProd,
    deleteProd
}