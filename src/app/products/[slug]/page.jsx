import { Suspense } from "react";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";
import { products } from "@/lib/data.js";

async function ProductContent({ params }) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-white">
      <ProductDetail product={product} />
    </div>
  );
}

export default function ProductPage({ params }) {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-white">
          <p className="text-lg font-semibold text-[#0084D1]">Loading...</p>
        </main>
      }
    >
      <ProductContent params={params} />
    </Suspense>
  );
}
