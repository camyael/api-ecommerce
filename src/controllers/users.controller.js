import UserDTO from "../dao/dto/Users.dto.js";
import { Users } from '../dao/Factory.js';
import { createHash, validatePassword } from '../services/BcryptService.js';
import config from '../config/config.js';
import jwt from 'jsonwebtoken';
import { mailPassportRestore } from "../services/MailService.js";

const users = new Users;

// login
const loginPost = async (req, res) => {
    const { mail, password } = req.body;
    if (!mail || !password) return res.status(400).send({status: "error", error: "Los datos estan incompletos"});
    if(mail === config.app.admin_email && password === config.app.admin_password) {
        const result = UserDTO.LoginDTOFrom({mail})
        const token = jwt.sign(result, "top_secretp", {expiresIn: "30s"});
        return res.cookie("sessionCookie", token,{ httpOnly: true }).send({status:"success", payload: {user: result, token}});;
    }
    const userFind = await users.findUser(mail)
    const isValidPassword = await validatePassword(userFind, password);
    if (!userFind) return res.status(400).send({status: "error", error: "El usuario no existe"});
    if(!isValidPassword) return res.status(400).send({status: "error", error: "La contraseña es incorrecta"});
    const tokenizedUser = UserDTO.RequestDTOFrom(userFind);
    const token = jwt.sign(tokenizedUser, config.jwt.secret, {expiresIn: "30s"});
    res.cookie(config.jwt.cookie, token,{ httpOnly: true }).send({status:"success", payload: {user: tokenizedUser, token}});
};

const registerPost = async (req, res) => {
    const { first_name, last_name, mail, phoneNumber, password } = req.body;
    if(!first_name || !last_name || !mail || !phoneNumber || !password) return res.status(400).send({status: "error", error: "Valores incompletos"})
    const exist = await users.findUser(mail)
    if(exist) return res.status(400).send({status: error, error: "El usuario ya existe"})
    const hashedPassword = await createHash(password) // hashea la contra del usuario
    if(req.file) {
        const image = config.app.public_url +'/images/users/'+req.file.filename;
        const user = UserDTO.RegisterDTOFrom({
            first_name,
            last_name,
            mail,
            phoneNumber,
            password: hashedPassword,
            image
        })
        const result = await users.save(user)
        res.send({status: "success", payload: result._id})
    }
    const user = UserDTO.RegisterDTOFrom({
        first_name,
        last_name,
        mail,
        phoneNumber,
        password: hashedPassword,
    })
    const result = await users.save(user)
    res.send({status: "success", payload: result._id})
};

// cerrar sesion
const logout = async (req, res) => {
    res.clearCookie(config.jwt.cookie).send({status:"success",message:"Logged out"})
};

// restaurar la contraseña
const passportRestore = async (req, res) => {
    const { mailBody } = req.body;
    if(!mailBody) return res.status(400).send({status: "error", error: "No se ha ingresado un mail valido"})
    const ifexists = await users.findUser(mailBody)
    if(!ifexists) return res.status(400).send({status: "error", error: `No existe el mail ${mailBody} en la base de datos`})
    const token = jwt.sign({mail: mailBody},config.jwt.secret,{expiresIn: "1h"});
    const userMail = UserDTO.MailRestorePassword(ifexists, token, config.app.app_frontend)
    const mail = mailPassportRestore(userMail)
    res.send({status: "success", message: "Mail mandado :)"})
}

// ya cambiada 
const restorepassword = async (req, res) => {
    const { password, token } = req.body
    if (!password || !token) return res.status(400).send({status: "error", error: "Datos incompletos"})
    const { mail } = jwt.verify(token, config.jwt.secret)
    const ifexists = await users.findUser(mail)
    if (!ifexists) return res.status(400).send({status: "error", error: "El mail no existe"})
    const hashedPassword = await createHash(password) // hashea la contra del usuario
    const updateUser = await users.restorePassword(mail, hashedPassword)
    if(!updateUser) return res.status(400).send({status: "error", error: "Error al actualizar la contraseña"})
    res.send({status: "success", message: "Se actualizó la contraseña"})
}

export default {
    loginPost,
    registerPost,
    logout,
    passportRestore,
    restorepassword
}