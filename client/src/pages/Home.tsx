import { Banner, ProductList } from "@/components";
import { products } from "@/utils/products";

const Home = () => {
  return (
    <div className="w-full max-w-[1920px] z-99 shadow-sm mx-auto xl:px-20 md:px-10 px-4 py-8">
      <Banner />
      <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
        <ProductList title="Featured Products" items={products} />
      </div>
    </div>
  );
};

export default Home;
