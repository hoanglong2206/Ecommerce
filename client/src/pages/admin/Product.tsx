import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ProductTable } from "@/components";

const Product = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Orders</CardTitle>
        <CardDescription>List of all orders</CardDescription>
      </CardHeader>
      <CardContent>
        <ProductTable data={[]} />
      </CardContent>
    </Card>
  );
};

export default Product;
