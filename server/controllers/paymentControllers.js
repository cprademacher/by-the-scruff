import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import Stripe from "stripe";
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Create stripe checkout session => /api/payment/checkout_session
export const stripeCheckoutSession = catchAsyncErrors(
  async (req, res, next) => {
    const body = req?.body;

    const line_items = body?.orderItems?.map((item) => {
      return {
        price_date: {
          currency: "usd",
          product_data: {
            name: item?.name,
            images: [item?.image],
            metaData: { productId: item?.product },
          },
          unit_amount: item?.price * 100,
        },
      };
    });

    const shipping_rate =
      body?.itemsPrice >= 200
        ? "shr_1OydXNCXSr3r3jJenObaVtGl"
        : "shr_1OydWFCXSr3r3jJeYOqIVmfx";

    const session = await stripe.checkout.session.create({
      payment_method_types: ["card"],
      success_url: `${process.env.FRONTEND_URL}/me/orders`,
      cancel_url: process.env.FRONTEND_URL,
      customer_email: req?.user?.email,
      client_reference_id: req?.user?._id?.toString(),
      mode: "payment",
      shipping_options: [
        {
          shipping_rate,
        },
      ],
    });
  }
);
