"use client";

import React, { Suspense, useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { products } from "@/lib/data";
import { ArrowRight, Search } from "lucide-react";

function NavbarContent() {
  const [shopOpen, setShopOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const searchRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  const shopItems = [
    { name: "Box", href: "/product-category/box" },
    { name: "Cake", href: "/product-category/cake" },
    { name: "Envelop", href: "/product-category/envelop" },
    { name: "Food Wrapping", href: "/product-category/food-wrapping" },
    { name: "Moulds", href: "/product-category/moulds" },
    { name: "Paper Cups", href: "/product-category/paper-cups" },
    { name: "Sheet", href: "/product-category/sheet" },
  ];

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredProducts =
    normalizedQuery === ""
      ? []
      : products.filter((product) => {
          const nameMatches = product.name
            ?.toLowerCase()
            .includes(normalizedQuery);

          const categoryMatches = Array.isArray(product.category)
            ? product.category.some((category) =>
                category?.toLowerCase().includes(normalizedQuery),
              )
            : product.category?.toLowerCase().includes(normalizedQuery);

          return nameMatches || categoryMatches;
        });

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchQuery("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectProduct = (slug) => {
    if (!slug) return;
    setSearchQuery("");
    setMobileMenuOpen(false);
    router.push(`/products/${slug}`);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (filteredProducts.length > 0) {
      handleSelectProduct(filteredProducts[0].slug);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-sky-100 bg-white font-sans shadow-sm backdrop-blur-md transition-all">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-0">
        <div className="flex h-20 items-center justify-between md:h-25">
          {/* Logo */}
          <div className="flex flex-shrink-0 items-center pl-2 sm:pl-4">
            <Link
              href="/"
              className="relative block h-20 w-20 overflow-hidden transition-transform hover:scale-105 sm:h-24 sm:w-24"
            >
              <Image
                src="/logo/logo.png"
                alt="Brand Logo"
                fill
                sizes="(max-width: 640px) 56px, 64px"
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop navigation and search */}
          <div className="ml-auto hidden items-center space-x-6 pr-2 lg:flex xl:space-x-10 sm:pr-0">
            <nav className="flex items-center space-x-6 xl:space-x-8">
              <Link
                href="/"
                className={`relative py-2 text-sm font-bold uppercase tracking-wide transition-all md:text-[16px] ${
                  pathname === "/"
                    ? "text-sky-600"
                    : "text-slate-700 hover:text-sky-500"
                }`}
              >
                Home
                {pathname === "/" && (
                  <span className="absolute bottom-0 left-0 h-[2.5px] w-full rounded-full bg-sky-500" />
                )}
              </Link>

              <Link
                href="/about"
                className={`py-2 text-sm font-semibold uppercase tracking-wide transition-colors md:text-[16px] ${
                  pathname === "/about"
                    ? "text-sky-600"
                    : "text-slate-700 hover:text-sky-500"
                }`}
              >
                About
              </Link>

              {/* Shop dropdown. The wrapper and menu form one continuous hover area. */}
              <div
                className="relative flex items-center"
                onMouseEnter={() => setShopOpen(true)}
                onMouseLeave={() => setShopOpen(false)}
              >
                <Link
                  href="/shop"
                  className={`py-2 text-sm font-semibold uppercase tracking-wide transition-colors md:text-[16px] ${
                    pathname.startsWith("/shop")
                      ? "text-sky-600"
                      : "text-slate-700 hover:text-sky-500"
                  }`}
                >
                  Shop
                </Link>

                <button
                  type="button"
                  onClick={() => setShopOpen((open) => !open)}
                  className={`ml-1 flex items-center py-2 focus:outline-none ${
                    pathname.startsWith("/shop")
                      ? "text-sky-600"
                      : "text-slate-700 hover:text-sky-500"
                  }`}
                  aria-label="Toggle Shop Dropdown"
                  aria-expanded={shopOpen}
                >
                  <svg
                    className={`h-3.5 w-3.5 transition-transform duration-300 ${
                      shopOpen ? "rotate-180 text-sky-500" : "text-slate-400"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {shopOpen && (
                  <div className="absolute left-0 top-full z-50 w-52 rounded-xl border border-sky-100 bg-white py-2 shadow-xl">
                    {shopItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setShopOpen(false)}
                        className="block border-b border-sky-50 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors last:border-none hover:bg-sky-50 hover:text-sky-600 md:text-base"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/career"
                className={`py-2 text-sm font-semibold uppercase tracking-wide transition-colors md:text-[16px] ${
                  pathname === "/career"
                    ? "text-sky-600"
                    : "text-slate-700 hover:text-sky-500"
                }`}
              >
                Career
              </Link>

              <Link
                href="/contact"
                className={`py-2 text-sm font-semibold uppercase tracking-wide transition-colors md:text-[16px] ${
                  pathname === "/contact"
                    ? "text-sky-600"
                    : "text-slate-700 hover:text-sky-500"
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Desktop search */}
            <div className="relative" ref={searchRef}>
              <form
                onSubmit={handleSearchSubmit}
                className="relative flex items-center rounded-full border border-sky-200 bg-sky-50/60 p-1 shadow-sm transition-all hover:border-sky-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-sky-300"
              >
                <div className="flex flex-1 items-center pl-2.5 pr-1">
                  <Search className="mr-1.5 h-5 w-5 flex-shrink-0 text-sky-500" />
                  <input
                    type="text"
                    placeholder="Search product"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    className="w-28 bg-transparent text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
                  />
                </div>

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="px-1 text-xs font-bold text-slate-400 hover:text-slate-600"
                  >
                    ✕
                  </button>
                )}

                <button
                  type="submit"
                  className="flex items-center justify-center rounded-full bg-sky-500 p-1.5 text-white shadow transition-colors hover:bg-sky-600"
                  aria-label="Search"
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>

                {searchQuery.trim() !== "" && (
                  <div className="absolute right-0 top-12 z-50 max-h-96 w-72 overflow-y-auto rounded-2xl border border-sky-100 bg-white p-2 shadow-2xl">
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((product) => (
                        <button
                          key={product.id ?? product.slug}
                          type="button"
                          onClick={() => handleSelectProduct(product.slug)}
                          className="group flex w-full cursor-pointer items-center space-x-3 rounded-xl border-b border-sky-50 p-2.5 text-left transition-all last:border-none hover:bg-sky-50/70"
                        >
                          <span className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg border border-sky-100 bg-slate-100 shadow-inner">
                            <Image
                              src={
                                product.images?.[0]?.url || "/placeholder.png"
                              }
                              alt={product.images?.[0]?.alt || product.name}
                              fill
                              className="object-cover transition-transform group-hover:scale-105"
                            />
                          </span>

                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-xs font-bold text-slate-800 transition-colors group-hover:text-sky-600">
                              {product.name}
                            </span>
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-sky-600">
                              {Array.isArray(product.category)
                                ? product.category.join(", ")
                                : product.category}
                            </span>
                          </span>

                          <span className="text-xs font-bold text-slate-400 group-hover:text-sky-500">
                            ↗
                          </span>
                        </button>
                      ))
                    ) : (
                      <div className="p-4 text-center">
                        <div className="mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-sky-50 text-xs text-sky-500">
                          🔍
                        </div>
                        <p className="text-xs font-bold text-slate-700">
                          No results found
                        </p>
                        <p className="mt-0.5 text-[10px] text-slate-400">
                          No match for &quot;{searchQuery}&quot;
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center pr-2 lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-2xl bg-sky-50 p-3 text-slate-700 shadow-sm transition-all hover:bg-sky-100 hover:text-sky-600 focus:outline-none"
              aria-label="Toggle Menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm lg:hidden">
          <div className="flex h-[100dvh] w-11/12 max-w-sm flex-col bg-white p-6 shadow-2xl">
            {/* Drawer header */}
            <div className="mb-3 flex flex-shrink-0 items-center justify-between border-b border-sky-100 pb-4">
              <div className="relative flex h-22 w-22 items-center justify-center overflow-hidden">
                <Image
                  src="/logo/logo.png"
                  alt="Brand Logo"
                  fill
                  sizes="(max-width: 640px) 56px, 100px"
                  className="object-contain"
                />
              </div>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-500 text-white shadow-md transition-colors hover:bg-sky-600"
                aria-label="Close Menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Mobile navigation */}
            <div className="flex-1 space-y-2.5 overflow-y-auto py-2 pr-1">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between rounded-2xl px-4 py-4 text-sm font-bold uppercase tracking-wider transition-all ${
                  pathname === "/"
                    ? "bg-sky-50 text-sky-600 shadow-sm"
                    : "text-slate-800 hover:bg-sky-50/50"
                }`}
              >
                <span>Home</span>
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                    pathname === "/"
                      ? "bg-sky-500 text-white"
                      : "bg-sky-50 text-sky-600"
                  }`}
                >
                  ↗
                </span>
              </Link>

              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between rounded-2xl px-4 py-4 text-sm font-semibold uppercase tracking-wider transition-all ${
                  pathname === "/about"
                    ? "bg-sky-50 text-sky-600 shadow-sm"
                    : "text-slate-800 hover:bg-sky-50/50"
                }`}
              >
                <span>About Us</span>
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                    pathname === "/about"
                      ? "bg-sky-500 text-white"
                      : "bg-sky-50 text-sky-600"
                  }`}
                >
                  ↗
                </span>
              </Link>

              {/* Mobile shop dropdown */}
              <div className="space-y-1">
                <div
                  className={`flex items-center justify-between rounded-2xl px-4 py-4 text-sm font-semibold uppercase tracking-wider transition-all ${
                    pathname.startsWith("/shop")
                      ? "bg-sky-50 text-sky-600 shadow-sm"
                      : "text-slate-800 hover:bg-sky-50/50"
                  }`}
                >
                  <Link
                    href="/shop"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1"
                  >
                    <span>Shop</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => setMobileShopOpen(!mobileShopOpen)}
                    className="p-1 focus:outline-none"
                    aria-label="Toggle Mobile Shop Menu"
                    aria-expanded={mobileShopOpen}
                  >
                    <svg
                      className={`h-4 w-4 transition-transform duration-300 ${
                        mobileShopOpen
                          ? "rotate-180 text-sky-500"
                          : "text-slate-400"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="2.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>

                {mobileShopOpen && (
                  <div className="space-y-1.5 pl-3 pt-1">
                    {shopItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between rounded-xl py-3 pl-6 pr-4 text-sm font-medium transition-colors ${
                          pathname === item.href
                            ? "bg-sky-50 font-bold text-sky-600"
                            : "text-slate-600 hover:bg-sky-50 hover:text-sky-600"
                        }`}
                      >
                        <span>{item.name}</span>
                        <span className="text-xs font-bold text-slate-400">
                          ↗
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/career"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between rounded-2xl px-4 py-4 text-sm font-semibold uppercase tracking-wider transition-all ${
                  pathname === "/career"
                    ? "bg-sky-50 text-sky-600 shadow-sm"
                    : "text-slate-800 hover:bg-sky-50/50"
                }`}
              >
                <span>Career</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-50 text-xs font-bold text-sky-600">
                  ↗
                </span>
              </Link>

              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between rounded-2xl px-4 py-4 text-sm font-semibold uppercase tracking-wider transition-all ${
                  pathname === "/contact"
                    ? "bg-sky-50 text-sky-600 shadow-sm"
                    : "text-slate-800 hover:bg-sky-50/50"
                }`}
              >
                <span>Contact Us</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-50 text-xs font-bold text-sky-600">
                  ↗
                </span>
              </Link>
            </div>

            {/* Mobile search */}
            <div className="relative flex-shrink-0 border-t border-sky-100 pt-3">
              {searchQuery.trim() !== "" && (
                <div className="absolute bottom-full left-0 z-50 mb-2 max-h-60 w-full overflow-y-auto rounded-2xl border border-sky-100 bg-white p-2 shadow-2xl">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <button
                        key={product.id ?? product.slug}
                        type="button"
                        onClick={() => handleSelectProduct(product.slug)}
                        className="group flex w-full items-center space-x-3 rounded-xl border-b border-sky-50 p-3 text-left transition-colors last:border-none hover:bg-sky-50"
                      >
                        <span className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg border border-sky-100 bg-slate-100">
                          <Image
                            src={product.images?.[0]?.url || "/placeholder.png"}
                            alt={product.images?.[0]?.alt || product.name}
                            fill
                            className="object-cover"
                          />
                        </span>

                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-xs font-bold text-slate-800 group-hover:text-sky-600">
                            {product.name}
                          </span>
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-sky-600">
                            {Array.isArray(product.category)
                              ? product.category.join(", ")
                              : product.category}
                          </span>
                        </span>

                        <span className="text-xs font-bold text-slate-400 group-hover:text-sky-500">
                          ↗
                        </span>
                      </button>
                    ))
                  ) : (
                    <div className="p-4 text-center">
                      <p className="text-xs font-bold text-slate-700">
                        No products found
                      </p>
                      <p className="mt-0.5 text-[10px] text-slate-400">
                        Try searching something else
                      </p>
                    </div>
                  )}
                </div>
              )}

              <form
                onSubmit={handleSearchSubmit}
                className="relative flex items-center rounded-2xl border border-sky-200 bg-sky-50/60 p-2.5 shadow-inner transition-all focus-within:border-sky-400 focus-within:bg-white"
              >
                <div className="flex flex-1 items-center pl-2 pr-2">
                  <svg
                    className="mr-2 h-4 w-4 flex-shrink-0 text-sky-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>

                  <input
                    type="text"
                    placeholder="Search product"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
                  />
                </div>

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="px-2 text-xs font-bold text-slate-400 hover:text-slate-600"
                  >
                    ✕
                  </button>
                )}

                <button
                  type="submit"
                  className="flex items-center justify-center rounded-xl bg-sky-500 p-2.5 text-white shadow transition-colors hover:bg-sky-600"
                  aria-label="Search"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14 5l7 7m0 0-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default function NavbarComponent() {
  return (
    <Suspense
      fallback={
        <header className="h-20 border-b border-sky-100 bg-white md:h-25" />
      }
    >
      <NavbarContent />
    </Suspense>
  );
}
