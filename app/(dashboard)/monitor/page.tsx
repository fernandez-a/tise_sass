import ProductList from "@/components/monitor/product-list";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Toaster } from "sonner";

export default function page() {

  return <>
    <Toaster />
    <ProductList />
  </>;
}
