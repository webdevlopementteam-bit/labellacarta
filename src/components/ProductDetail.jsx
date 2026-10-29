import Image from "next/image";
import Link from "next/link";
import ProductImageGallery from "./ProductImageGallery";
import { products } from "@/lib/data.js";

function formatLabel(key) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]/g, " ")
    .replace(/^./, (char) => char.toUpperCase());
}

function formatFeature(feature) {
  const separatorIndex = feature.indexOf(":");

  if (separatorIndex === -1) {
    return <span>{feature}</span>;
  }

  const title = feature.slice(0, separatorIndex);
  const description = feature.slice(separatorIndex + 1).trim();

  return (
    <>
      <strong className="font-semibold text-slate-900">{title}:</strong>{" "}
      <span>{description}</span>
    </>
  );
}

function getCategories(category) {
  if (Array.isArray(category)) return category;
  return category ? [category] : [];
}
function createCategorySlug(category) {
  return category.toLowerCase().trim().replace(/\s+/g, "-");
}

export default function ProductDetail({ product }) {
  if (!product) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-16">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">
            Product not found
          </h1>
          <p className="mt-2 text-slate-600">
            The product you are looking for could not be found.
          </p>
          <Link
            href="/"
            className="mt-5 inline-flex rounded-lg bg-[#0084D1] px-5 py-3 font-semibold text-white transition hover:bg-sky-700"
          >
            Back to home
          </Link>
        </div>
      </main>
    );
  }

  const categories = getCategories(product.category);
  const tableRows = Array.isArray(product.tableData) ? product.tableData : [];
  const tableColumns = tableRows.length ? Object.keys(tableRows[0]) : [];
  const features = Array.isArray(product.features) ? product.features : [];

  const allProducts = Array.isArray(products) ? products : [];

  const relatedProducts = allProducts
    .filter((item) => {
      if (item.id === product.id || item.slug === product.slug) return false;

      const itemCategories = getCategories(item.category);
      return itemCategories.some((category) => categories.includes(category));
    })
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-7 flex flex-wrap items-center gap-2 text-sm"
        >
          <Link
            href="/"
            className="font-semibold text-[#0084D1] transition hover:text-sky-800"
          >
            Home
          </Link>

          {categories.map((category, index) => (
            <span
              key={`${category}-${index}`}
              className="flex items-center gap-2"
            >
              <span aria-hidden="true" className="text-slate-400">
                ›
              </span>
              <span className="font-semibold text-[#0084D1]">{category}</span>
            </span>
          ))}

          <span aria-hidden="true" className="text-slate-400">
            ›
          </span>
          <span className="font-medium text-slate-500">{product.name}</span>
        </nav>

        {/* Main product content */}
        <div className="grid items-start gap-8 md:grid-cols-2 md:gap-12">
          <div className="min-w-0">
            <ProductImageGallery product={product} />
          </div>

          <section className="min-w-0">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#0084D1]">
              Product details
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {product.name}
            </h1>

            {product.description && (
              <p className="mt-5 leading-7 text-slate-600">
                {product.description}
              </p>
            )}

            {/* Specification table */}
            {tableRows.length > 0 && tableColumns.length > 0 && (
              <section className="mt-8" aria-label="Product specifications">
                <h2 className="mb-3 text-lg font-semibold text-slate-900">
                  Specifications
                </h2>

                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[520px] border-collapse text-left">
                      <thead>
                        <tr className="bg-[#0084D1] text-white">
                          {tableColumns.map((column) => (
                            <th
                              key={column}
                              scope="col"
                              className="px-5 py-4 text-sm font-semibold capitalize tracking-wide"
                            >
                              {formatLabel(column)}
                            </th>
                          ))}
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-slate-100">
                        {tableRows.map((row, rowIndex) => (
                          <tr
                            key={rowIndex}
                            className="bg-white transition-colors hover:bg-sky-50"
                          >
                            {tableColumns.map((column) => (
                              <td
                                key={column}
                                className="px-5 py-4 text-sm text-slate-700"
                              >
                                {row[column] ?? "—"}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            )}

            {/* Features */}
            {features.length > 0 && (
              <section className="mt-8">
                <h2 className="mb-4 text-lg font-semibold text-slate-900">
                  Features
                </h2>

                <ul className="space-y-3">
                  {features.map((feature, index) => (
                    <li
                      key={`${index}-${feature}`}
                      className="flex items-start gap-3 text-sm leading-6 text-slate-600 sm:text-base"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#0084D1]"
                      />
                      <span>{formatFeature(feature)}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Categories */}
            {categories.length > 0 && (
              <div className="mt-8 border-t border-slate-200 pt-5">
                <span className="text-sm font-bold uppercase tracking-wide text-slate-700">
                  Category
                </span>

                <div className="mt-3 flex flex-wrap gap-2">
                  {categories.map((category, index) => (
                    <Link
                      href={`/product-category/${createCategorySlug(category)}`}
                      key={`${category}-${index}`}
                      className="rounded-full bg-sky-50 px-3 py-1.5 text-sm  font-bold text-[#0084D1] hover:text-blue-800 "
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <section className="relative mt-20 overflow-hidden rounded-3xl bg-gradient-to-br from-sky-50 via-white to-blue-50 px-5 py-10 sm:px-8 lg:px-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#0084D1]/10 blur-3xl"
            />

            <div className="relative">
              <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#0084D1]/15 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#0084D1] shadow-sm">
                    <span className="h-2 w-2 rounded-full bg-[#0084D1]" />
                    Curated for you
                  </span>

                  <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
                    Related products
                  </h2>

                  <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
                    Explore more products from{" "}
                    <span className="font-semibold text-[#0084D1]">
                      {categories.join(", ")}
                    </span>
                    .
                  </p>
                </div>

                <span className="text-sm font-medium text-slate-500">
                  {relatedProducts.length}{" "}
                  {relatedProducts.length === 1 ? "product" : "products"}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {relatedProducts.map((item) => {
                  const image = item.images?.[0];
                  const itemCategories = getCategories(item.category);

                  return (
                    <article
                      key={item.id ?? item.slug}
                      className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#0084D1]/30 hover:shadow-[0_18px_45px_rgba(0,132,209,0.14)]"
                    >
                      <Link
                        href={`/products/${item.slug}`}
                        aria-label={`View ${item.name}`}
                        className="relative block aspect-[4/3] overflow-hidden bg-gradient-to-br from-sky-50 to-white"
                      >
                        {image ? (
                          <Image
                            src={image.url}
                            alt={image.alt || item.name}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                            className="object-contain p-5 transition-transform duration-700 ease-out group-hover:scale-110"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-sm text-slate-400">
                            Image unavailable
                          </div>
                        )}

                        <span className="absolute bottom-4 right-4 grid h-10 w-10 translate-y-2 place-items-center rounded-full bg-white text-[#0084D1] opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                          <span aria-hidden="true" className="text-lg">
                            ↗
                          </span>
                        </span>
                      </Link>

                      <div className="p-5">
                        <h3 className="line-clamp-1 text-lg font-bold text-slate-900 transition-colors group-hover:text-[#0084D1]">
                          {item.name}
                        </h3>

                        <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-slate-500">
                          {item.description ||
                            item.features?.[0] ||
                            "Discover product details and available specifications."}
                        </p>

                        <div className="mt-5 border-t border-slate-100 pt-4">
                          <Link
                            href={`/products/${item.slug}`}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0084D1] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#0084D1] focus:ring-offset-2"
                          >
                            View product
                            <span
                              aria-hidden="true"
                              className="transition-transform group-hover:translate-x-1"
                            >
                              →
                            </span>
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
