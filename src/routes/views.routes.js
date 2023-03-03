import { Router } from "express";
import viewsController from "../controllers/views.controller.js";
import { executePolicies } from "../middlewares/auth.middleware.js";

const router = Router();

router.get('/api/products', viewsController.viewProducts)
router.get('/api/carts', executePolicies("ADMIN"), viewsController.viewCarts)

export default router;