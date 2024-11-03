import { Catalog } from "@/components/shared/catalog/Catalog";
import Loader from "@/components/ui/Loader/Loader";
import { Suspense } from "react";

export default async function CatalogPage() {
  return (
    <Suspense fallback={<Loader />}>
      <Catalog />
    </Suspense>
  );
}
