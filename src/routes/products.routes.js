import { Router } from "express";
import { uploaderProducts } from "../utils.js";
import productsController from "../controllers/products.controller.js";
import { executePolicies } from "../middlewares/auth.middleware.js";

const router = Router()

router.get('/', productsController.getAll)
router.post('/', uploaderProducts.single('image'), productsController.newProd)
router.get('/:pid', productsController.prodById)
router.put('/:pid', productsController.updateProd)
router.delete('/:pid', executePolicies("ADMIN"), productsController.deleteProd)

export default router