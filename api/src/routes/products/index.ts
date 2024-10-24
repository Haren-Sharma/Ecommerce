import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  updateProduct,
} from "./productController";
import { validateData } from "../../middleware/validationMiddleWare";
import {
  createProductsSchema,
  updateProductSchema,
} from "../../db/productsSchema";

const router = Router();

router.get("/", listProducts);
router.get("/:id", getProductById);
router.put("/:id", validateData(updateProductSchema), updateProduct);
router.post("/", validateData(createProductsSchema), createProduct);
router.delete("/:id", deleteProduct);

export default router;
