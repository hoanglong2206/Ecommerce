import { Banner, Footer, Navbar, ProductList } from "@/components";
import { products } from "@/utils/products";

const Home = () => {
  return (
    <div className="h-full flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="w-full max-w-[1920px] z-99 shadow-sm mx-auto xl:px-20 md:px-2 px-4">
          <Banner />
          <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
            <ProductList title="Featured Products" items={products} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
