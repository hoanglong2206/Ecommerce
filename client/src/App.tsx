import { Routes, Route } from "react-router-dom";
import {
  Home,
  Login,
  Register,
  NotFound,
  Cart,
  ProductDetail,
  Shopping,
} from "@/pages";
import { DefaultLayout } from "@/layouts";

function App() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shop" element={<Shopping />} />
        <Route path="/product-detail/:id" element={<ProductDetail />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
