import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import { connectDB } from "./config/db.js";

import ProductRoutes from "./routes/product.route.js";


dotenv.config();

export const app = express();
export const PORT = process.env.PORT || 5000;

export const __dirname = path.resolve();

app.use(express.json());  // allows us to accept JSON data in the req.body
app.use(cors());

app.use("/api/products", ProductRoutes);

if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/vite-project/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend, vite-project, dist, index.html"));
  });
}

app.listen(5000, () => {
  connectDB();
  console.log("Server started at http://localhost:5000");
});