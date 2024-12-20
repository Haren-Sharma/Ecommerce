import express, { json } from "express";
import products from "../src/routes/products/index.js";
import authRoute from "../src/routes/auth/index.js";

const app = express();

const PORT = 3000;

app.use(json()); //used to parse req object

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/products", products);
app.use("/auth", authRoute);

app.listen(PORT, () => {
  console.log(`App listening on PORT:${PORT}`);
});
