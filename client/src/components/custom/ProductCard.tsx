import { Product } from "@/interfaces";
import { formatPrice, truncateText } from "@/lib/utils";
import { Expand, Heart, ShoppingCart } from "lucide-react";
import Rating from "@mui/material/Rating";
import { Button } from "../ui/button";

interface ProductCardProps {
  data: Product;
}

const ProductCard = ({ data }: ProductCardProps) => {
  return (
    <div className=" bg-slate-50 rounded-md p-2 transition text-sm shadow-sm">
      <div className="cursor-pointer relative group w-full">
        <div className="aspect-square p-3 overflow-hidden relative w-full border">
          <img
            src={data.images[0].image}
            alt={data.name}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="opacity-0 group-hover:opacity-75 transition absolute w-full px-6 bottom-24">
          <div className="flex gap-x-6 justify-center">
            <button className="rounded-full flex items-center justify-center bg-white border shadow-md p-2 hover:scale-110 transition">
              <Expand size={20} className="text-gray-600" />
            </button>
            <button className="rounded-full flex items-center justify-center bg-white border shadow-md p-2 hover:scale-110 transition">
              <ShoppingCart size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <p className="font-semibold text-lg">{truncateText(data.name)}</p>
        <p className="text-sm text-gray-500">{data.category}</p>
      </div>
      <div>
        <Rating name="rating" value={data.rating} precision={0.5} readOnly />
      </div>
      <div className="flex items-center justify-between">
        <div className="font-semibold">{formatPrice(data.price)}</div>
        <Button variant={"ghost"} size={"icon"} className="rounded-full">
          <Heart className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
