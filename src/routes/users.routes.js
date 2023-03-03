import { Router } from "express";
import usersController from "../controllers/users.controller.js";
import { uploaderUsers } from "../utils.js";

const router = Router();

// inicio de sesion
router.post('/login', usersController.loginPost)

// registrarse
router.post('/register', uploaderUsers.single('image'), usersController.registerPost)

// restaurar la contraseña
router.post('/passportrestore', usersController.passportRestore)
router.put('/restorepassword', usersController.restorepassword)

// cerrar sesion
router.get('/logout', usersController.logout)

export default router;