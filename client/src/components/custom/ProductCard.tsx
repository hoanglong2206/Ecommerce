import { Product } from "@/interfaces";
import { formatPrice, truncateText } from "@/lib/utils";
import { Heart } from "lucide-react";
import Rating from "@mui/material/Rating";
import { Button } from "../ui/button";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { Expand, ShoppingCart } from "lucide-react";

interface ProductCardProps {
  data: Product;
}

const ProductCard = ({ data }: ProductCardProps) => {
  const navigate: NavigateFunction = useNavigate();
  return (
    <div className=" bg-slate-50 dark:bg-slate-700 rounded-md transition text-sm shadow-md space-y-2">
      <div className="relative group w-full cursor-pointer">
        <div
          onClick={() => {
            navigate(`/product-detail/${data.id}`);
          }}
          className="aspect-square overflow-hidden relative w-full"
        >
          <img
            src={data.imageCover}
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
      <div className="p-4 space-y-2">
        <div className="space-y-1">
          <h3 className="text-base font-medium text-slate-700">{data.brand}</h3>
          <h4
            onClick={() => {
              navigate(`/product-detail/${data.id}`);
            }}
            className="text-lg font-semibold cursor-pointer hover:text-slate-700"
          >
            {truncateText(data.name, 18)}
          </h4>
        </div>
        <Rating name="rating" value={data.rating} precision={0.1} readOnly />
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-slate-800">
            {formatPrice(data.price)}
          </span>

          <Button variant={"ghost"} size={"icon"} className="rounded-full">
            <Heart className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
