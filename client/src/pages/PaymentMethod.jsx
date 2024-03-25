/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import MetaData from "../components/MetaData";
import { useSelector } from "react-redux";
import { calculateOrderCost } from "../helpers/helpers";
import { useCreateNewOrderMutation } from "../redux/api/orderApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function PaymentMethod() {
  const [method, setMethod] = useState("");

  const navigate = useNavigate();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);

  const [createNewOrder, { isLoading, error, isSuccess }] =
    useCreateNewOrderMutation();

  useEffect(() => {
    if (error) {
      toast(error?.data?.message);
    }

    if (isSuccess) {
      navigate("/");
    }
  }, [error, isSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();

    const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
      calculateOrderCost(cartItems);

    if (method === "Cash") {
      // Create cash order
      const orderData = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice,
        shippingAmount: shippingPrice,
        taxAmount: taxPrice,
        totalAmount: totalPrice,
        paymentInfo: {
          status: "Not Paid",
        },
        paymentMethod: "Cash",
      };

      console.log(orderData);
      createNewOrder(orderData);
    }

    if (method === "Card") {
      // Stripe checkout
      alert("Card");
    }
  };

  return (
    <>
      <MetaData title={"Payment Method"} />

      <CheckoutSteps shipping confirmOrder payment />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow rounded bg-body" onSubmit={submitHandler}>
            <h2 className="mb-4">Select Payment Method</h2>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="payment_mode"
                id="codradio"
                value="Cash"
                onChange={(e) => setMethod("Cash")}
              />
              <label className="form-check-label" htmlFor="codradio">
                Cash on Delivery
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="payment_mode"
                id="cardradio"
                value="Card"
                onChange={(e) => setMethod("Card")}
              />
              <label className="form-check-label" htmlFor="cardradio">
                Card - VISA, MasterCard
              </label>
            </div>

            <button id="shipping_btn" type="submit" className="btn py-2 w-100">
              {isLoading ? "Loading..." : "CONTINUE"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
