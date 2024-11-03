import Checkout from "@/components/shared/checkout/Checkout";
import Loader from "@/components/ui/Loader/Loader";
import { Suspense } from "react";

export default function CheckoutPage() {
  return (
    <Suspense fallback={<Loader />}>
      <Checkout />
    </Suspense>
  );
}
