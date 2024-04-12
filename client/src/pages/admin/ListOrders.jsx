/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../components/Loader.jsx";
import { MDBDataTable } from "mdbreact";
import MetaData from "../../components/MetaData.jsx";
import AdminLayout from "../AdminLayout.jsx";
import { useGetAdminOrdersQuery } from "../../redux/api/orderApi.js";

export default function ListOrders() {
  const { data, isLoading, error } = useGetAdminOrdersQuery();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    // if (deleteError) {
    //   console.log(deleteError);
    //   toast.error(deleteError?.data?.message);
    // }

    // if (isSuccess) {
    //   toast.success("Product Deleted");
    // }
  }, [error]);

  //   const deleteProductHandler = (id) => {
  //     console.log("Deleting product with ID: ", id);
  //     deleteProduct({ id });
  //   };

  const setOrders = () => {
    const orders = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Payment Status",
          field: "paymentStatus",
          sort: "asc",
        },
        {
          label: "Order Status",
          field: "orderStatus",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    data?.orders?.forEach((order) => {
      orders.rows.push({
        id: order?._id,
        paymentStatus: order?.paymentInfo?.status?.toUpperCase(),
        orderStatus: order?.orderStatus,
        actions: (
          <>
            <Link
              to={`/admin/products/${order?._id}`}
              className="btn btn-outline-primary"
            >
              <i className="fa fa-pencil"></i>
            </Link>

            <button
              className="btn btn-outline-danger ms-2"
              //   onClick={() => deleteProductHandler(product?._id)}
              //   disabled={isDeleteLoading}
            >
              <i className="fa fa-trash"></i>
            </button>
          </>
        ),
      });
    });

    return orders;
  };

  if (isLoading) return <Loader />;

  return (
    <AdminLayout>
      <MetaData title={"All Orders"} />
      <h1 className="my-5">{data?.orders?.length} Orders</h1>

      <MDBDataTable
        data={setOrders()}
        className="px-3"
        bordered
        striped
        hover
      />
    </AdminLayout>
  );
}
