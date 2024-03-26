import { Rating } from "@mui/material";
import { Button } from "@/components/ui/button";
import {
  CircleCheck,
  Minus,
  Plus,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";
import { useState } from "react";
import { Product } from "@/interfaces";
import { ProductImages } from "@/components";

type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  price: number;
  quantity: number;
};

interface ProductInfoProps {
  data: Product;
}

const ProductInfo = ({ data }: ProductInfoProps) => {
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: data.id,
    name: data.name,
    description: data.description,
    category: data.category,
    brand: data.brand,
    price: data.price,
    quantity: 1,
  });
  return (
    <div className="lg:grid lg:grid-cols-2 lg:items-start gap-x-12 space-y-8">
      <ProductImages data={data} />
      <div className="flex flex-col gap-1 text-sm font-medium space-y-4">
        <h2 className="text-3xl ">{cartProduct?.name}</h2>
        <div className="flex items-center gap-2">
          <Rating name="rating" value={data.rating} precision={0.5} readOnly />
          <div>{data.reviews} reviews</div>
        </div>
        <hr className="my-3" />
        <div className="text-justify font-normal">
          {cartProduct.description}
        </div>
        <hr className="my-3 w-1/2 md:w-1/3" />
        <div>
          <span>CATEGORY :</span> {cartProduct.category}
        </div>
        <div>
          <span>BRAND :</span> {cartProduct.brand}
        </div>
        <div
          className={`${
            data?.inStock ? "text-teal-500" : "text-rose-500"
          } uppercase `}
        >
          {data?.inStock ? "In stock" : "Out of stock"}
        </div>
        <hr className="my-3 w-1/2 md:w-1/3" />
        {/* <p className="flex items-center gap-x-2 text-teal-400 ">
          <CircleCheck className="h-5 w-5" />
          <span className="text-base">Product added to cart</span>
        </p>
        <Button variant={"outline"} className="w-1/2 md:w-1/3">
          View Cart <ShoppingBag className="w-5 h-5 ml-2" />
        </Button> */}
        <div className="flex gap-x-3 items-center">
          <span>COLOR :</span>
          <div className="flex items-center gap-x-2">
            {data.images.map((image) => (
              <div
                key={image.color}
                className={`h-6 w-6 rounded-full border-teal-300 flex items-center justify-center border-[1.5px]`}
              >
                <div
                  style={{ background: image.colorCode }}
                  className="h-5 w-5 rounded-full border-[1.2px] border-slate-300"
                ></div>
              </div>
            ))}
          </div>
        </div>
        <hr className="my-3 w-1/2 md:w-1/3" />
        <div className="flex gap-x-3 items-center">
          <span>QUANTITY :</span>
          <div className="flex gap-x-4 items-center text-base">
            <Button size={"icon"} className="h-8 w-8" variant={"outline"}>
              <Minus className="h-4 w-4" />
            </Button>
            <div>1</div>
            <Button size={"icon"} className="h-8 w-8" variant={"outline"}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <hr className="my-3 w-1/2 md:w-1/3" />
        <Button className="w-1/2 md:w-1/3">
          Add To Cart <ShoppingCart className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default ProductInfo;
