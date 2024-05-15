import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { OrderTable } from "@/components";

const Order = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Orders</CardTitle>
        <CardDescription>List of all orders</CardDescription>
      </CardHeader>
      <CardContent>
        <OrderTable data={[]} />
      </CardContent>
    </Card>
  );
};

export default Order;
