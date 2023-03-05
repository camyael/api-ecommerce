import nodemailer from "nodemailer";
import config from "../config/config.js";

export const mailOptions = async (to, subject, html) => {
    let listProducts = ""
    html.forEach(e => {
        listProducts += `<p>Producto ${e.product._id}, cantidad ${e.count}</p>`
    });

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        auth: {
            user: config.nodemailer.user,
            pass: config.nodemailer.password
        }
    })

    const result = await transporter.sendMail({
        from: `Ecommerce Coderhouse <${config.nodemailer.user}>`,
        to: to,
        subject: subject,
        html: 
            `<h3>Pedido de compra de ${to}</h3>` + listProducts
    })

    return result;
}

export const mailPassportRestore = async (to) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        auth: {
            user: config.nodemailer.user,
            pass: config.nodemailer.password
        }
    })

    const result = await transporter.sendMail({
        from: `clothege | recuperaciones de cuenta`,
        to: to.mail,
        subject: `Recuperación de contraseña para ${to.first_name} ${to.last_name}`,
        html:
            `<div>
                <h1>${to.first_name}, recibimos tu solicitud por el cambio de contraseña</h1>
                <br>
                <p>Para reestablecer la contraseña, entra en este <a href=${to.url}/restorepassport?token=${to.token}>enlace</a>
                <p>Si no solicitaste este cambio, ignora este correo</p>
                <p> - clothege ! </p>
            </div>
            `
    })

    return result;
}