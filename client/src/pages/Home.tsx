import { Banner, CarouselProduct, Container, ProductList } from "@/components";
import { products } from "@/utils/products";

const Home = () => {
  return (
    <Container>
      <Banner />
      <div className="">
        <CarouselProduct />
      </div>
      <hr className="my-10" />
      <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
        <ProductList title="Featured Products" items={products} />
      </div>
    </Container>
  );
};

export default Home;
