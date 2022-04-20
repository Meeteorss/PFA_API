import express from "express";

export const prodRouter = express.Router();

prodRouter.get("/", (req, res) => {
  console.log("Prods route");
  res.send("Prods");
});
