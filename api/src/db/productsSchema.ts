import {
  doublePrecision,
  integer,
  pgTable,
  text,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const productsTable = pgTable("products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: text(),
  image: varchar({ length: 255 }),
  price: doublePrecision().notNull(),
});

export const createProductsSchema = createInsertSchema(productsTable).omit({
  id: true,
  //this will automatically create the schema otherwise
  //needs to create by this
  /*
  z.object({
    name:z.string(),
    price:z.number({message:"Price should be a number"})
    })
    */
});

export const updateProductSchema=createInsertSchema(productsTable).omit({
  id:true,
}).partial();//all the fileds are not mandatory
