import express from "express";
import dotenv from "dotenv";
const app = express();
import { connectDatabase } from "./config/dbConnect.js";
import errorMiddleWare from "./middlewares/errors.js";

dotenv.config({ path: "server/config/config.env" });

// Connecting to database
connectDatabase();

// Use express middleware to parse incoming data into json
app.use(express.json());

// Import all routes
import productRoutes from "./routes/products.js";

app.use("/api", productRoutes);

// Use error middleware
app.use(errorMiddleWare);

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err}`);
  console.log("Shutting down server due to Unhandled Promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});
