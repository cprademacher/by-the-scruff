import express from "express";
import dotenv from "dotenv";
const app = express();
import { connectDatabase } from "./config/dbConnect.js";

dotenv.config({ path: "server/config/config.env" });

// Connecting to database
connectDatabase();

// Use express middleware to parse incoming data into json
app.use(express.json());

// Import all routes
import productRoutes from "./routes/products.js";

app.use("/api", productRoutes);

app.listen(process.env.PORT, () => {
  console.log(
    `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});
