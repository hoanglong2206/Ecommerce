import { MoveLeft, Undo2 } from "lucide-react";
import { Button } from "../ui/button";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { Separator } from "@radix-ui/react-dropdown-menu";
import CartItem from "./CartItem";

const CartClient = () => {
  const navigate: NavigateFunction = useNavigate();
  return (
    <>
      {/* <div className="flex flex-col items-center space-y-2">
      <div className="text-2xl">Your cart is empty</div>
      <div>
        <Button
          onClick={() => navigate("/")}
          className="flex items-center gap-x-2"
        >
          <Undo2 className="w-5 h-5" />
          <span>Start Shopping</span>
        </Button>
      </div>
    </div> */}
      <div className="space-y-4">
        <h3 className="font-bold text-3xl">Shopping Cart</h3>
        <div className="grid grid-cols-5 text-sm items-center">
          <div className="col-span-2 justify-self-start">PRODUCT</div>
          <div className="justify-self-center">PRICE</div>
          <div className="justify-self-center">QUANTITY</div>
          <div className="justify-self-end">TOTAL</div>
        </div>
        <hr className="my-3 w-full" />
        <div>
          <CartItem />
        </div>
        <hr className="my-3 w-full" />
        <div className="flex justify-between">
          <div>
            <Button>Clear Cart</Button>
          </div>
          <div className="text-base flex flex-col items-start gap-y-2">
            <div className="flex justify-between w-full text-lg font-semibold">
              <span>Subtotal</span>
              <span>$1,000</span>
            </div>
            <p>Taxes and shipping calculate at checkout</p>
            <Button className="w-full">Checkout</Button>
            <Link to="/" className="flex items-center gap-x-2">
              <MoveLeft className="h-4 w-4" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartClient;
