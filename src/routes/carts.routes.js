import { Router } from "express";
import cartController from "../controllers/cart.controller.js";
import { executePolicies } from "../middlewares/auth.middleware.js";

const router = Router()

router.post('/', cartController.newCart)
router.post('/checkout', cartController.checkoutCarts)
router.delete('/:cid', executePolicies("ADMIN"), cartController.deleteCart)
router.get('/:cid/products', cartController.prodCarts)
router.post('/:cid/products', cartController.newprodCarts)
router.post('/:cid/products/checkout', cartController.checkoutCarts)
router.delete('/:cid/products/:pid', executePolicies("ADMIN"), cartController.deleteprodCarts)

export default router