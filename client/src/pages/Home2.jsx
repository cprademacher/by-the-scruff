import MetaData from "../components/MetaData";
import ProductItem from "../components/product/ProductItem.jsx";
import Loader from "../components/Loader.jsx";
import { useGetProductsQuery } from "../redux/api/productsApi.js";

export default function Home2() {
  const { data, isLoading, error } = useGetProductsQuery();

  console.log(data);

  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <MetaData title={"Home"} />
      <div className="row">
        <div className="col-12 col-sm-6 col-md-12">
          <h1 id="products_heading" className="text-secondary">
            Latest Products
          </h1>

          <section id="products" className="mt-5">
            <div className="row">
              {data?.products?.map((product) => (
                <ProductItem key={product._id} product={product} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
