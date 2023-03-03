import twilio from "twilio";
import config from "../config/config.js";

const client = twilio(config.twilio.user, config.twilio.token);

export const sendingWhatsapp = async (to, body) => {
    let listProducts = ""
    body.forEach(e => {
        listProducts += `Producto ${e.product._id}, cantidad ${e.count}`
    });

    const result = await client.messages.create({
        from: 'whatsapp:+14155238886',
        to: `whatsapp:+${to.phoneNumber}`,
        body: `Nuevo pedido de ${to.fullname} ` + listProducts
    })

    return result;
}

export const sendingSMS = async (to, body) => {
    let listProducts = ""
    body.forEach(e => {
        listProducts += `Producto ${e.product._id}, cantidad ${e.count}`
    });

    const result = await client.messages.create({
        from: config.twilio.number,
        to: to.phoneNumber,
        body: `Nuevo pedido de ${to.fullname}` + listProducts
    })

    return result;
}