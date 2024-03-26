import { Product } from "@/interfaces";
import { ProductCard } from "@/components";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";

interface ProductListProps {
  title: string;
  items: Product[];
}

const ProductList = ({ title, items }: ProductListProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-3xl">{title}</h3>
        <Button variant={"outline"}>
          SEE ALL <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {items.map((item) => (
          <ProductCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
