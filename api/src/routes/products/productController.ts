import { Request, Response } from "express";

export function listProducts(req: Request, res: Response) {
  res.send("Product List");
}

export function createProduct(req: Request, res: Response) {
  res.send("Creating a product");
}

export function deleteProduct(req: Request, res: Response) {
  res.send("Deleted a prod with id " + req.params?.id);
}
export function getProductById(req: Request, res: Response) {
  res.send("Prod Id:" + req.params?.id);
}
export function updateProduct(req: Request, res: Response) {
  res.send("Update a product");
}
