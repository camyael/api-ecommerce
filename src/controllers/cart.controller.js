import { Carts } from "../dao/Factory.js";
import { mailOptions } from "../services/MailService.js";
import { sendingWhatsapp } from "../services/TwilioService.js";

const cart = new Carts;

const newCart = async (req, res) => {
    // Crea un carrito y devuelve su id.
    const timestamp = new Date().toLocaleString()
    const result = await cart.newCart( timestamp )
}

const deleteCart = async (req, res) => {
    // Vacía un carrito y lo elimina.
    const id = req.params.cid
    if(!id) return res.status(400).send({status: "error", error: "Datos incompletos"})
    const del = await cart.deleteCart(id)
    if(!del) return res.status(400).send({status: "error", error: "No se pudo borrar"})
    res.send({status: "success", message: "Se borró el carrito"})
}

const prodCarts = async (req, res) => {
    // Me permite listar todos los productos guardados en el carrito
    const idCart = req.params.cid
    const findCart = await cart.getById(req, idCart)
    const cartProd = findCart.products
    res.send({status: sucess, payload: cartProd})
}

const newprodCarts = async (req, res) => {
    // Para incorporar productos al carrito por su id de producto
    const id = req.params.cid
    const prodId = req.body.id
    const prodQntfy = req.body.quantify
    const prod = {
        "id" : prodId,
        "quantify" : prodQntfy
    }
    await cart.postInCart(id, prod)
    res.send({status: "success", payload: "Productos incorporados"})
}

// carrito individual
const checkoutCarts = async (req, res) => {
    const timestamp = new Date().toLocaleString()
    const {cartItem, user} = req.body
    const resultIdCart = await cart.newCart(timestamp)
    if(!resultIdCart) return res.send({status: "error", payload: "No se pudo crear el carrito"})
    const resultUpdate = await cart.postInCart(resultIdCart, cartItem)
    const mail = mailOptions(
        "camilavillaverde3@gmail.com",
        `Nuevo pedido de ${user.fullname}`,
        cartItem
    )
    const whatsapp = sendingWhatsapp(user, cartItem)
    res.send({status: "success", payload: `Compra ${resultIdCart} finalizada`})
}

const deleteprodCarts = async (req, res) => {
    // Eliminar un producto del carrito por su id de carrito y de producto
    const idCart = req.params.cid
    const idProd = req.params.pid
    await cart.deleteProducts(idCart, idProd)
}

export default {
    newCart,
    deleteCart,
    prodCarts,
    checkoutCarts,
    newprodCarts,
    deleteprodCarts
}