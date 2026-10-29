import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/lib/data.js";

function createCategorySlug(category) {
  return category
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getCategories(category) {
  if (Array.isArray(category)) return category;
  return category ? [category] : [];
}

export default async function ProductCategoryPage({ params }) {
  const { slug } = await params;
  const allProducts = Array.isArray(products) ? products : [];

  const matchingProducts = allProducts.filter((product) =>
    getCategories(product.category).some(
      (category) => createCategorySlug(category) === slug,
    ),
  );

  if (matchingProducts.length === 0) {
    notFound();
  }

  const categoryName = getCategories(matchingProducts[0].category).find(
    (category) => createCategorySlug(category) === slug,
  );

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex items-center gap-2 text-sm"
        >
          <Link
            href="/"
            className="font-semibold text-[#0084D1] hover:text-sky-800"
          >
            Home
          </Link>
          <span aria-hidden="true" className="text-slate-400">
            ›
          </span>
          <span className="font-medium text-slate-600">{categoryName}</span>
        </nav>

        {/* Heading */}
        <header className="mb-8 rounded-3xl bg-gradient-to-r from-sky-50 via-white to-blue-50 px-6 py-8 sm:px-10">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0084D1]">
            Browse collection
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {categoryName}
          </h1>
          <p className="mt-2 text-slate-600">
            {matchingProducts.length}{" "}
            {matchingProducts.length === 1 ? "product" : "products"} in this
            category
          </p>
        </header>

        {/* Products */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {matchingProducts.map((product) => {
            const image = product.images?.[0];
            const productCategories = getCategories(product.category);

            return (
              <article
                key={product.id ?? product.slug}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-xl"
              >
                <Link
                  href={`/products/${product.slug}`}
                  aria-label={`View ${product.name}`}
                  className="relative block aspect-[4/3] overflow-hidden bg-gradient-to-br from-sky-50 to-white"
                >
                  <Image
                    src={image?.url || "/placeholder.png"}
                    alt={image?.alt || product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                </Link>

                <div className="flex flex-1 flex-col p-5">
                  <Link
                    href={`/products/${product.slug}`}
                    className="group/name"
                  >
                    <h2 className="line-clamp-2 min-h-11 text-base font-extrabold leading-6 tracking-wide text-slate-900 transition-colors group-hover/name:text-[#0084D1]">
                      {product.name}
                    </h2>
                  </Link>

                  {productCategories.length > 0 && (
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      {productCategories.map((category) => (
                        <Link
                          key={category}
                          href={`/product-category/${createCategorySlug(category)}`}
                          className="rounded-full bg-[#0084D1]/[0.08] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-[#0084D1] transition hover:bg-[#0084D1] hover:text-white"
                        >
                          {category}
                        </Link>
                      ))}
                    </div>
                  )}

                  <p className="mt-3 line-clamp-2 flex-1 text-sm leading-6 text-slate-500">
                    {product.description ||
                      product.features?.[0] ||
                      "Explore product details and available specifications."}
                  </p>

                  <Link
                    href={`/products/${product.slug}`}
                    className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-[#0084D1] px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-[#0084D1] focus:ring-offset-2"
                  >
                    View product
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
