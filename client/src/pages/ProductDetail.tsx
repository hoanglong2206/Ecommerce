import { ProductInfo, ProductList } from "@/components";
import { products } from "@/utils/products";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((product) => product.id === id);
  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <div className="w-full max-w-[1920px] z-99 shadow-sm mx-auto xl:px-20 md:px-10 px-4 py-8">
      <div className="px-4 py-10 sm:px-6 lg:px-8">
        <ProductInfo data={product} />
        <hr className="my-10" />
        <hr className="my-10" />
        <ProductList title="Related Items" items={products} />
      </div>
    </div>
  );
};

export default ProductDetail;
