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
    <div className=" bg-slate-50 dark:bg-slate-700 rounded-md p-2 transition text-sm shadow-md space-y-2">
      <div
        onClick={() => {
          navigate(`/product-detail/${data.id}`);
        }}
        className="relative group w-full cursor-pointer"
      >
        <div className="aspect-square p-3 overflow-hidden relative w-full">
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
      <div>
        <p
          onClick={() => {
            navigate(`/product-detail/${data.id}`);
          }}
          className="font-semibold text-lg hover:text-gray-700 dark:hover:text-gray-300 transition cursor-pointer"
        >
          {truncateText(data.name)}
        </p>
        <p className="text-sm ">{data.category}</p>
      </div>
      <div>
        <Rating
          name="rating"
          value={data.rating}
          size="small"
          precision={0.5}
          readOnly
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="font-semibold">{formatPrice(data.price)}</div>
        <Button variant={"ghost"} size={"icon"} className="rounded-full">
          <Heart className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
