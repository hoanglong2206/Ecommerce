import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { CustomerTable } from "@/components";

const Customer = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Customers</CardTitle>
        <CardDescription>List of all customers</CardDescription>
      </CardHeader>
      <CardContent>
        <CustomerTable data={[]} />
      </CardContent>
    </Card>
  );
};

export default Customer;
