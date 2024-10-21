import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("List of products");
});

router.get("/:id", (req, res) => {
  const { params } = req;
  res.send("Product Id entered:" + params.id);
});

export default router;
