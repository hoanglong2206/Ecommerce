import { Rating } from "@mui/material";
import { Button } from "@/components/ui/button";
import {
  CircleCheck,
  Minus,
  Plus,
  Heart,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";
import { useState } from "react";
import { Product } from "@/interfaces";
import { ProductImages } from "@/components";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Label } from "../ui/label";

type CartProductType = {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
};

interface ProductInfoProps {
  data: Product;
}

const ProductInfo = ({ data }: ProductInfoProps) => {
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: data.id,
    name: data.name,
    category: data.category,
    brand: data.brand,
    price: data.price,
    size: data.size[0].name,
    color: data.size[0].color[0].name,
    quantity: 1,
  });

  const handleAddToCart = () => {
    console.log(cartProduct);
  };

  const IncreaseQuantity = () => {
    setCartProduct({
      ...cartProduct,
      quantity: cartProduct.quantity + 1,
    });
  };

  const DecreaseQuantity = () => {
    setCartProduct({
      ...cartProduct,
      quantity: cartProduct.quantity - 1,
    });
  };
  return (
    <div className="lg:grid lg:grid-cols-2 lg:items-start gap-x-12 space-y-8">
      <ProductImages data={data} />
      <div className="flex flex-col gap-1 text-sm font-medium space-y-2">
        <h2 className="text-3xl ">{cartProduct.name}</h2>
        <hr className="my-3" />
        <div className="flex items-center gap-2">
          <span className="text-2xl font-semibold text-red-500">
            ${cartProduct.price}
          </span>
          <span className="text-sm line-through ">
            ${cartProduct.price + 50}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Rating name="rating" value={data.rating} precision={0.5} readOnly />
          <div className="text-slate-400">{data.comments.length} reviews</div>
        </div>
        <hr className="my-3" />
        <div className="flex items-center gap-x-2">
          CATEGORY :
          <span className="uppercase text-slate-400">
            {cartProduct.category}
          </span>
        </div>
        <div>
          BRAND :
          <span className="uppercase text-slate-400"> {cartProduct.brand}</span>
        </div>
        <div className="flex items-center gap-x-2">
          TAG:
          {data.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <div
          className={`${
            data?.inStock ? "text-teal-500" : "text-rose-500"
          } uppercase `}
        >
          {data?.inStock ? "In stock" : "Out of stock"}
        </div>
        <hr className="my-3" />
        <div className="flex flex-col gap-y-2">
          SIZE
          <RadioGroup
            defaultValue={cartProduct.size}
            onValueChange={(e) =>
              setCartProduct({
                ...cartProduct,
                size: e,
                quantity: 1,
              })
            }
            className="flex items-center gap-x-2"
          >
            {data.size.map((size) => (
              <div key={size.name}>
                <RadioGroupItem
                  value={size.name}
                  id={size.name}
                  className="peer sr-only "
                />
                <Label
                  htmlFor={size.name}
                  className="flex w-9 h-9 items-center justify-center rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-teal-400 [&:has([data-state=checked])]:border-teal-400"
                >
                  {size.name}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className="flex flex-col gap-y-2">
          COLOR
          <RadioGroup
            defaultValue={cartProduct.color}
            onValueChange={(e) =>
              setCartProduct({
                ...cartProduct,
                color: e,
                quantity: 1,
              })
            }
            className="flex items-center gap-x-2"
          >
            {data.size
              .find((size) => size.name === cartProduct.size)
              ?.color.map((color) => (
                <div key={color.name}>
                  <RadioGroupItem
                    value={color.name}
                    id={color.name}
                    className="peer sr-only "
                  />
                  <Label
                    htmlFor={color.name}
                    className="flex w-9 h-9 items-center justify-center rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-teal-400 [&:has([data-state=checked])]:border-teal-400"
                    style={{ backgroundColor: color.code }}
                  ></Label>
                </div>
              ))}
          </RadioGroup>
        </div>
        <div className="flex gap-x-3 items-center">
          <span>QUANTITY :</span>
          <div className="flex gap-x-4 items-center text-base">
            <Button
              onClick={DecreaseQuantity}
              disabled={cartProduct.quantity === 1}
              size={"icon"}
              className="h-8 w-8"
              variant={"outline"}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <div>{cartProduct.quantity}</div>
            <Button
              onClick={IncreaseQuantity}
              disabled={
                data.size
                  .find((size) => size.name === cartProduct.size)
                  ?.color.find((color) => color.name === cartProduct.color)
                  ?.quantity === cartProduct.quantity
              }
              size={"icon"}
              className="h-8 w-8"
              variant={"outline"}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <hr className="my-3" />
        {/* <p className="flex items-center gap-x-2 text-teal-400 ">
          <CircleCheck className="h-5 w-5" />
          <span className="text-base">Product added to cart</span>
        </p>
        <Button variant={"outline"} className="w-1/2 md:w-1/3">
          View Cart <ShoppingBag className="w-5 h-5 ml-2" />
        </Button> */}
        <div className="flex items-center justify-evenly gap-x-8">
          <Button onClick={handleAddToCart} className="w-1/3">
            Add To Cart <ShoppingCart className="w-5 h-5 ml-2" />
          </Button>

          <Button variant={"outline"} className="w-1/3">
            Buy Now <ShoppingBag className="w-5 h-5 ml-2" />
          </Button>

          <Button variant={"outline"} className="w-1/3">
            Add to Wishlist
            <Heart className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
