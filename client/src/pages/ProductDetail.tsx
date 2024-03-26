import {
  Container,
  ProductInfo,
  ProductList,
  ProductReviews,
} from "@/components";
import { products } from "@/utils/products";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((product) => product.id === id);
  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <Container>
      <div className="px-4 py-10 sm:px-6 lg:px-8">
        <ProductInfo data={product} />
        <hr className="my-10" />
        <ProductReviews data={product} />
        <hr className="my-10" />
        <ProductList title="Related Items" items={products} />
      </div>
    </Container>
  );
};

export default ProductDetail;
