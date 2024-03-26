import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";

const CartItem = () => {
  return (
    <div className="grid grid-cols-5 text-xs md:text-sm gap-4 py-4 items-center">
      <div className="col-span-2 justify-self-start flex gap-x-4">
        <Link to={"/product"}>
          <div className="relative aspect-square w-16">
            <img
              src="https://m.media-amazon.com/images/I/61g+McQpg7L._AC_SX679_.jpg"
              alt="image"
              className="object-contain"
            />
          </div>
        </Link>
        <div className="flex flex-col justify-center gap-y-2">
          <Link to={"/product"}>Apple</Link>
          <div>black</div>
        </div>
      </div>
      <div className="justify-self-center font-semibold">$2,000</div>
      <div className="justify-self-center">
        <div className="flex gap-x-4 items-center text-base">
          <Button size={"icon"} className="h-8 w-8" variant={"outline"}>
            <Minus className="h-4 w-4" />
          </Button>
          <div>2</div>
          <Button size={"icon"} className="h-8 w-8" variant={"outline"}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="justify-self-end font-semibold">$4,000</div>
    </div>
  );
};

export default CartItem;
