import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  updateProduct,
} from "./productController.js";
import { validateData } from "../../middleware/validationMiddleWare.js";
import {
  createProductsSchema,
  updateProductSchema,
} from "../../db/productsSchema.js";
import { verifyJwt } from "../../middleware/verifyJwt.js";
import { verifySeller } from "../../middleware/verifySeller.js";

const router = Router();

router.get("/", listProducts);
router.get("/:id", getProductById);
router.put(
  "/:id",
  verifyJwt,
  verifySeller,
  validateData(updateProductSchema),
  updateProduct
);
router.post(
  "/",
  verifyJwt,
  verifySeller,
  validateData(createProductsSchema),
  createProduct
);
router.delete("/:id", verifyJwt, verifySeller, deleteProduct);

export default router;
