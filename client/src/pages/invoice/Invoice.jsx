/* eslint-disable no-unused-vars */
import MetaData from "../../components/MetaData";
import "./invoice.css";
import logo from "../../images/Driftwood_Wordmark_Tagline_1.png";
import { useParams } from "react-router-dom";
import { useOrderDetailsQuery } from "../../redux/api/orderApi";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useEffect } from "react";
import toast from "react-hot-toast";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export default function Invoice() {
  const params = useParams();
  const { data, isLoading, error } = useOrderDetailsQuery(params?.id);

  const order = data?.order || {};

  const { user } = useSelector((state) => state.auth);

  const { shippingInfo, orderItems, paymentInfo, totalAmount, orderStatus } =
    order;

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error]);

  const handleDownload = () => {
    const input = document.getElementById("order_invoice");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF();

      const pdfWidth = pdf.internal.pageSize.getWidth();

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, 0);
      pdf.save(`invoice_${order?._id}.pdf`);
    });
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <MetaData title={"Order Invoice"} />

      <div className="order-invoice my-5">
        <div className="row d-flex justify-content-center mb-5">
          <button className="btn btn-success col-md-5" onClick={handleDownload}>
            <i className="fa fa-print"></i> Download Invoice
          </button>
        </div>
        <div id="order_invoice" className="p-3 border border-secondary">
          <header className="clearfix">
            <div id="logo">
              <img src={logo} alt="Company Logo" />
            </div>
            <h1>INVOICE #{order?._id}</h1>
            <div id="company" className="clearfix">
              <div>ByTheScruff</div>
              <div>
                Address
                <br />
                Austin, TX 78746
              </div>
              <div>(512) 459-2222</div>
              <div>
                <a href="mailto:info@bythescruff.com">info@bythescruff.com</a>
              </div>
            </div>
            <div id="project">
              <div>
                <span>Name</span> {user?.name}
              </div>
              <div>
                <span>EMAIL</span> {user?.email}
              </div>
              <div>
                <span>PHONE</span> {shippingInfo?.phoneNo}
              </div>
              <div>
                <span>ADDRESS</span> {shippingInfo?.address},{" "}
                {shippingInfo?.city}, {shippingInfo?.zipCode},{" "}
                {shippingInfo?.country}
              </div>
              <div>
                <span>DATE</span>{" "}
                {new Date(order?.createdAt).toLocaleString("en-US")}
              </div>
              <div>
                <span>Status</span> {paymentInfo?.status}
              </div>
            </div>
          </header>
          <main>
            <table className="mt-5">
              <thead>
                <tr>
                  <th className="service">ID</th>
                  <th className="desc">NAME</th>
                  <th>PRICE</th>
                  <th>QTY</th>
                  <th>TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {orderItems?.map((item) => (
                  <tr key={item?.product}>
                    <td className="service">{item?.product}</td>
                    <td className="desc">{item?.name}</td>
                    <td className="unit">${item?.price}</td>
                    <td className="qty">{item?.quantity}</td>
                    <td className="total">${item?.price * item?.quantity}</td>
                  </tr>
                ))}

                <tr>
                  <td colSpan="4">
                    <b>SUBTOTAL</b>
                  </td>
                  <td className="total">${order?.itemsPrice}</td>
                </tr>

                <tr>
                  <td colSpan="4">
                    <b>TAX 15%</b>
                  </td>
                  <td className="total">${order?.taxAmount}</td>
                </tr>

                <tr>
                  <td colSpan="4">
                    <b>SHIPPING</b>
                  </td>
                  <td className="total">${order?.shippingAmount}</td>
                </tr>

                <tr>
                  <td colSpan="4" className="grand total">
                    <b>GRAND TOTAL</b>
                  </td>
                  <td className="grand total">${order?.totalAmount}</td>
                </tr>
              </tbody>
            </table>
            <div id="notices">
              <div>NOTICE:</div>
              <div className="notice">
                A finance charge of 1.5% will be made on unpaid balances after
                30 days.
              </div>
            </div>
          </main>
          <footer>
            Invoice was created on a computer and is valid without the
            signature.
          </footer>
        </div>
      </div>
    </>
  );
}
