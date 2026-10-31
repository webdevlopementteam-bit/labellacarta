"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { products } from "@/lib/data";
import Breadcrumb from "@/components/Breadcrumb";

const ITEMS_PER_PAGE = 16;

function getProductCategories(category) {
  const categoryList = Array.isArray(category)
    ? category
    : category
      ? [category]
      : [];

  return categoryList.filter((item) => typeof item === "string" && item.trim());
}

function createCategorySlug(category) {
  return category
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function ShopPage() {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("default");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const categories = useMemo(() => {
    const allCategories = products.flatMap((product) =>
      getProductCategories(product.category),
    );

    return ["ALL", ...new Set(allCategories)];
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== "ALL") {
      result = result.filter((product) =>
        getProductCategories(product.category).includes(selectedCategory),
      );
    }

    if (sortOrder === "name-a-z") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === "name-z-a") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    return result;
  }, [selectedCategory, sortOrder]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const startIndex =
    filteredProducts.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0;

  const endIndex = Math.min(
    currentPage * ITEMS_PER_PAGE,
    filteredProducts.length,
  );

  const selectedCategoryLabel =
    selectedCategory === "ALL" ? "All categories" : selectedCategory;

  const sortLabel = {
    default: "Featured",
    "name-a-z": "Name: A to Z",
    "name-z-a": "Name: Z to A",
  }[sortOrder];

  return (
    <main className="w-full overflow-hidden bg-[#f7fbfe] text-slate-900">
      <Breadcrumb title="shop" />

      <section className="relative isolate px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 bg-gradient-to-b from-[#0084D1]/[0.08] to-transparent" />
        <div className="pointer-events-none absolute -right-32 top-28 -z-10 h-80 w-80 rounded-full bg-[#0084D1]/[0.08] blur-3xl" />

        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#0084D1]/15 bg-white px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#0084D1] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#0084D1]" />
              The Pack Hub collection
            </span>

            <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Explore our products
            </h1>

            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Find the right packaging solution for your business.
            </p>
          </div>

          {/* Product count and category/sort dropdown */}
          <div className="mb-7 rounded-2xl border border-[#0084D1]/10 bg-white p-3 shadow-[0_12px_35px_-25px_rgba(0,132,209,0.3)] sm:p-5">
            <div className="flex items-center justify-between gap-3">
              {/* Product count */}
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400 sm:text-xs sm:tracking-[0.16em]">
                  Products
                </p>

                <p className="mt-1 text-xs font-semibold text-slate-700 sm:text-sm">
                  <span className="text-[#0084D1]">
                    {startIndex}–{endIndex}
                  </span>{" "}
                  of{" "}
                  <span className="font-bold text-[#0084D1]">
                    {filteredProducts.length}
                  </span>
                </p>
              </div>

              {/* Category/sort dropdown */}
              <div className="relative shrink-0">
                <button
                  type="button"
                  aria-expanded={filtersOpen}
                  aria-haspopup="true"
                  onClick={() => setFiltersOpen((open) => !open)}
                  className="flex min-h-11 max-w-[190px] items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-left shadow-sm transition hover:border-[#0084D1]/50 focus:outline-none focus:ring-2 focus:ring-[#0084D1]/15 sm:max-w-none sm:gap-4 sm:px-4 sm:py-3"
                >
                  <span className="min-w-0">
                    <span className="block text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400 sm:text-[10px] sm:tracking-[0.16em]">
                      Filter &amp; sort
                    </span>

                    <span className="mt-0.5 block truncate text-xs font-bold text-slate-800 sm:mt-1 sm:text-sm">
                      {selectedCategoryLabel}
                      <span className="px-1 text-slate-300">·</span>
                      {sortLabel}
                    </span>
                  </span>

                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                    className={`h-4 w-4 shrink-0 text-slate-500 transition-transform sm:h-5 sm:w-5 ${
                      filtersOpen ? "rotate-180" : ""
                    }`}
                  >
                    <path
                      d="m5 7.5 5 5 5-5"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {filtersOpen && (
                  <>
                    <button
                      type="button"
                      aria-label="Close filters"
                      className="fixed inset-0 z-10 cursor-default"
                      onClick={() => setFiltersOpen(false)}
                    />

                    <div className="absolute right-0 z-20 mt-2 max-h-[65vh] w-[min(17rem,calc(100vw-1.5rem))] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2 text-left shadow-xl sm:w-72">
                      <p className="px-3 pb-2 pt-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                        Category
                      </p>

                      <div className="max-h-44 overflow-y-auto">
                        {categories.map((category) => {
                          const isSelected = selectedCategory === category;

                          return (
                            <button
                              key={category}
                              type="button"
                              onClick={() => {
                                setFiltersOpen(false);

                                if (category === "ALL") {
                                  setSelectedCategory("ALL");
                                  setCurrentPage(1);
                                  return;
                                }

                                router.push(
                                  `/product-category/${createCategorySlug(category)}`,
                                );
                              }}
                              className={`w-full rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition ${
                                isSelected
                                  ? "bg-[#0084D1]/[0.08] text-[#0084D1]"
                                  : "text-slate-700 hover:bg-slate-50"
                              }`}
                            >
                              {category === "ALL" ? "All categories" : category}
                            </button>
                          );
                        })}
                      </div>

                      <div className="my-2 border-t border-slate-100" />

                      <p className="px-3 pb-2 pt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                        Sort by
                      </p>

                      {[
                        { value: "default", label: "Featured" },
                        { value: "name-a-z", label: "Name: A to Z" },
                        { value: "name-z-a", label: "Name: Z to A" },
                      ].map((option) => {
                        const isSelected = sortOrder === option.value;

                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                              setSortOrder(option.value);
                              setCurrentPage(1);
                              setFiltersOpen(false);
                            }}
                            className={`w-full rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition ${
                              isSelected
                                ? "bg-[#0084D1]/[0.08] text-[#0084D1]"
                                : "text-slate-700 hover:bg-slate-50"
                            }`}
                          >
                            {option.label}
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {paginatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-6">
              {paginatedProducts.map((product) => {
                const productCategories = getProductCategories(
                  product.category,
                );

                return (
                  <article
                    key={product.id}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-[#0084D1]/10 bg-white shadow-[0_12px_35px_-28px_rgba(15,67,110,0.35)] transition duration-300 hover:-translate-y-1 hover:border-[#0084D1]/25 hover:shadow-[0_22px_50px_-25px_rgba(0,132,209,0.3)]"
                  >
                    <Link
                      href={`/product/${product.slug}`}
                      aria-label={`View ${product.name}`}
                      className="relative block aspect-[4/3] overflow-hidden"
                    >
                      <Image
                        src={product.images?.[0]?.url || "/placeholder.png"}
                        alt={product.images?.[0]?.alt || product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, 25vw"
                        className="object-contain p-4 transition-transform duration-300 group-hover:scale-110"
                      />
                    </Link>

                    <div className="flex flex-1 flex-col p-5">
                      <Link
                        href={`/product/${product.slug}`}
                        className="group/name"
                      >
                        <h2 className="line-clamp-2 min-h-11 text-sm font-extrabold leading-5 tracking-wide text-slate-900 transition-colors group-hover/name:text-[#0084D1]">
                          {product.name}
                        </h2>
                      </Link>

                      {productCategories.length > 0 && (
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          {productCategories.map((category) => (
                            <div
                              key={category}
                              className="rounded-full bg-[#0084D1]/[0.08] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-[#0084D1]"
                            >
                              {category}
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                          Explore item
                        </span>

                        <Link
                          href={`/product/${product.slug}`}
                          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold text-[#0084D1] transition hover:bg-[#0084D1]/[0.07]"
                        >
                          View product
                          <svg
                            viewBox="0 0 20 20"
                            fill="none"
                            className="h-3.5 w-3.5"
                            aria-hidden="true"
                          >
                            <path
                              d="M3.5 10h13m0 0-5-5m5 5-5 5"
                              stroke="currentColor"
                              strokeWidth="1.7"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-[#0084D1]/25 bg-white px-6 py-20 text-center shadow-sm">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0084D1]/[0.08] text-[#0084D1]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-7 w-7"
                  aria-hidden="true"
                >
                  <circle
                    cx="10.8"
                    cy="10.8"
                    r="6.8"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                  <path
                    d="m16 16 4.5 4.5M8 10.8h5.6"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>
              </span>

              <h2 className="mt-5 text-xl font-extrabold text-slate-900">
                No products found
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                There are no products in this category right now.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("ALL");
                  setCurrentPage(1);
                }}
                className="mt-6 rounded-xl bg-[#0084D1] px-5 py-3 text-sm font-bold text-white shadow-md shadow-[#0084D1]/20 transition hover:bg-[#0073b8]"
              >
                Show all products
              </button>
            </div>
          )}

          {filteredProducts.length > ITEMS_PER_PAGE && (
            <nav
              className="mt-10 flex flex-wrap items-center justify-center gap-2"
              aria-label="Product pages"
            >
              <button
                type="button"
                onClick={() => {
                  setCurrentPage((page) => Math.max(1, page - 1));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-600 transition hover:border-[#0084D1] hover:text-[#0084D1] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span aria-hidden="true">←</span>
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => {
                      setCurrentPage(page);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    aria-current={currentPage === page ? "page" : undefined}
                    aria-label={`Page ${page}`}
                    className={`h-10 min-w-10 rounded-xl border px-3 text-sm font-bold transition ${
                      currentPage === page
                        ? "border-[#0084D1] bg-[#0084D1] text-white shadow-md shadow-[#0084D1]/20"
                        : "border-slate-200 bg-white text-slate-600 hover:border-[#0084D1] hover:text-[#0084D1]"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}

              <button
                type="button"
                onClick={() => {
                  setCurrentPage((page) => Math.min(totalPages, page + 1));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-600 transition hover:border-[#0084D1] hover:text-[#0084D1] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
                <span aria-hidden="true">→</span>
              </button>
            </nav>
          )}
        </div>
      </section>
    </main>
  );
}
