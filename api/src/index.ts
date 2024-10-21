import express from "express";
import products from "../src/routes/products";
const app = express();
const PORT = 3000;
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/products", products);
app.listen(PORT, () => {
  console.log(`App listening on PORT:${PORT}`);
});
