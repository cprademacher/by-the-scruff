import Order from "../models/Order.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";

// Create New Order => /api/orders/new
export const newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxAmount,
    shippingAmount,
    totalAmount,
    paymentMethod,
    paymentInfo,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxAmount,
    shippingAmount,
    totalAmount,
    paymentMethod,
    paymentInfo,
    user: req.user._id,
  });

  res.status(200).json({
    order,
  });
});

// Get current user oders  => /api/me/orders/
export const myOrders = catchAsyncErrors(async (req, res, next) => {
  // 'populate("user")' below comes form mongoose and allows us to see all the user data in the returned orders data
  const orders = await Order.find({ user: req.user._id }).populate(
    "user",
    "name email"
  );

  if (!orders) {
    return next(new ErrorHandler("No order found with this ID.", 404));
  }

  res.status(200).json({
    orders,
  });
});

// Get Order Details => /api/orders/:id
export const getOrderDetails = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("No order found with this ID.", 404));
  }

  res.status(200).json({
    order,
  });
});
