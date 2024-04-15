/* eslint-disable react-hooks/exhaustive-deps */
import MetaData from "../components/MetaData";
import { useEffect } from "react";
import ProductItem from "../components/product/ProductItem.jsx";
import Loader from "../components/Loader.jsx";
import toast from "react-hot-toast";
import { useGetProductsQuery } from "../redux/api/productsApi.js";
import CustomPagination from "../components/CustomPagination.jsx";
import { useSearchParams } from "react-router-dom";
import Filters from "../components/Filters.jsx";

export default function ProductsPage() {
  let [searchParams] = useSearchParams();

  const page = searchParams.get("page") || 1;
  const keyword = searchParams.get("keyword") || "";
  const min = searchParams.get("min");
  const max = searchParams.get("max");
  const category = searchParams.get("category");
  const ratings = searchParams.get("ratings");

  const params = { page, keyword };

  min !== null && (params.min = min);
  max !== null && (params.max = max);
  category !== null && (params.category = category);
  ratings !== null && (params.ratings = ratings);

  const { data, isLoading, error, isError } = useGetProductsQuery(params);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError]);

  const columnSize = keyword ? 4 : 3;

  if (isLoading) return <Loader />;

  let productSearch = data?.products?.length === 1 ? "product" : "products";

  return (
    <>
      <MetaData title={"Products"} />
      <div className="row">
        {keyword && (
          <div className="col-6 col-md-3 mt-5">
            <Filters />
          </div>
        )}
        <div
          className={
            keyword ? "col-12 col-sm-6 col-md-9" : "col-12 col-sm-6 col-md-12"
          }
        >
          <h1 id="products_heading" className="text-secondary">
            {keyword
              ? `${data?.products?.length} ${productSearch} found with keyword: ${keyword}`
              : "Latest Products"}
          </h1>

          <section id="products" className="mt-5">
            <div className="row">
              {data?.products?.map((product) => (
                <ProductItem
                  key={product._id}
                  product={product}
                  columnSize={columnSize}
                />
              ))}
            </div>
          </section>

          <CustomPagination
            resPerPage={data?.resPerPage}
            filteredProductsCount={data?.filteredProductsCount}
          />
        </div>
      </div>
    </>
  );
}
