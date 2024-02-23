import express from "express";
import {
  newOrder,
  getOrderDetails,
  myOrders,
} from "../controllers/orderControllers.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";
const router = express.Router();

router.route("/orders/new").post(isAuthenticatedUser, newOrder);
router.route("/orders/:id").get(isAuthenticatedUser, getOrderDetails);
router.route("/me/orders/").get(isAuthenticatedUser, myOrders);

export default router;
