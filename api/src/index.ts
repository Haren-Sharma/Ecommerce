import express from "express";
const app = express();
const PORT = 3000;
app.get("/", (req, res) => {
  res.send("Hello Wo");
});
app.listen(PORT, () => {
  console.log(`App listening on PORT:${PORT}`);
});
