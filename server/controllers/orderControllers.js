import Order from "../models/Order.js";
import Product from "../models/Product.js";
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

// Get all oders - ADMIN  => /api/admin/orders/
export const getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  if (!orders) {
    return next(new ErrorHandler("No orders found.", 404));
  }

  res.status(200).json({
    orders,
  });
});

// Update Order Details - ADMIN  => /api/admin/orders/:id
export const updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("No order found with this id.", 404));
  }

  if (order?.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already delivered this order", 400));
  }

  // Update product's stock once orderStatus is either delivered or shipped (up to you)
  order?.orderItems?.forEach(async (item) => {
    const product = await Product.findById(item?.product?.toString());
    if (!product) {
      return next(new ErrorHandler("No product found with this id.", 404));
    }
    product.stock = product.stock - item.quantity;
    await product.save({ validateBeforeSave: false });
  });

  //   Set order status to that which has been passed into the body
  order.orderStatus = req.body.status;
  order.deliveredAt = Date.now();

  await order.save();

  res.status(200).json({
    success: true,
  });
});
