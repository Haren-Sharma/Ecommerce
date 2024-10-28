import { Request, Response } from "express";
import { db } from "../../db/index";
import { productsTable } from "../../db/productsSchema";
import { eq } from "drizzle-orm";
import _ from "lodash";

export async function listProducts(req: Request, res: Response) {
  try {
    const products = await db.select().from(productsTable);
    res.json(products);
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function createProduct(req: Request, res: Response) {
  try {
    const [product] = await db
      .insert(productsTable)
      .values(req.cleanBody)
      .returning();
    res.status(201).json(product);
  } catch (e) {
    res.status(400).send(e);
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const [product] = await db
      .delete(productsTable)
      .where(eq(productsTable.id, Number(req.params?.id)))
      .returning();
    if (!product) {
      res
        .status(404)
        .send({ msg: `Product with id ${req.params.id} not found` });
    } else {
      res.status(204).send();
    }
  } catch (e) {
    res.status(500).send(e);
  }
}
export async function getProductById(req: Request, res: Response) {
  try {
    const [product] = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, Number(req.params?.id)));
    if (!product) {
      res
        .status(404)
        .send({ msg: `Product with id ${req.params.id} not found` });
    } else {
      res.json(product);
    }
  } catch (e) {
    res.status(500).send(e);
  }
}
export async function updateProduct(req: Request, res: Response) {
  try {
    const [product] = await db
      .update(productsTable)
      .set(req.cleanBody)
      .where(eq(productsTable.id, Number(req.params?.id)))
      .returning();
      if (!product) {
        res
          .status(404)
          .send({ msg: `Product with id ${req.params.id} not found` });
      } else {
        res.json(product);
      }
  } catch (e) {
    res.status(500).send(e);
  }
}
