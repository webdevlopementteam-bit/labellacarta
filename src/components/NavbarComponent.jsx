"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { products } from "@/lib/data";

export default function NavbarComponent() {
  const [shopOpen, setShopOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const searchRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  const shopItems = [
    { name: "Box", href: "/shop/box" },
    { name: "Cake", href: "/shop/cake" },
    { name: "Envelop", href: "/shop/envelop" },
    { name: "Food Wrapping", href: "/shop/food-wrapping" },
    { name: "Moulds", href: "/shop/moulds" },
    { name: "Paper Cups", href: "/shop/paper-cups" },
    { name: "Sheet", href: "/shop/sheet" },
  ];

  const filteredProducts =
    searchQuery.trim() === ""
      ? []
      : products.filter(
          (product) =>
            product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category?.toLowerCase().includes(searchQuery.toLowerCase()),
        );

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
    router.push(`/shop/${slug}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (filteredProducts.length > 0) {
      handleSelectProduct(filteredProducts[0].slug);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FFFFFF] backdrop-blur-md border-b border-sky-100 shadow-sm font-sans transition-all">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-4">
        <div className="flex items-center justify-between h-20">
          {/* Left: Logo (Only Image, removed background, borders, and shadows) */}
          <div className="flex-shrink-0 flex items-center pl-2 sm:pl-4">
            <Link
              href="/"
              className="relative block w-14 h-14 sm:w-18 sm:h-18 overflow-hidden transition-transform hover:scale-105"
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

          {/* Right Section: Navigation Links & Compact Search Bar on Desktop */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 pr-2 sm:pr-4">
            <nav className="flex items-center space-x-6 xl:space-x-8">
              <Link
                href="/"
                className={`font-bold tracking-wide text-sm uppercase transition-all relative py-2 ${
                  pathname === "/"
                    ? "text-sky-600"
                    : "text-slate-700 hover:text-sky-500"
                }`}
              >
                Home
                {pathname === "/" && (
                  <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-sky-500 rounded-full"></span>
                )}
              </Link>

              <Link
                href="/about"
                className={`font-semibold tracking-wide text-sm uppercase transition-colors py-2 ${
                  pathname === "/about"
                    ? "text-sky-600"
                    : "text-slate-700 hover:text-sky-500"
                }`}
              >
                About
              </Link>

              {/* SHOP Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => setShopOpen(true)}
                onMouseLeave={() => setShopOpen(false)}
              >
                <button
                  onClick={() => setShopOpen(!shopOpen)}
                  className={`flex items-center space-x-1 font-semibold tracking-wide text-sm uppercase transition-colors py-2 focus:outline-none ${
                    pathname.startsWith("/shop")
                      ? "text-sky-600"
                      : "text-slate-700 hover:text-sky-500"
                  }`}
                >
                  <span>Shop</span>
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${shopOpen ? "rotate-180 text-sky-500" : "text-slate-400"}`}
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
                  <div className="absolute left-0 mt-1 w-52 bg-white rounded-xl shadow-xl py-2 border border-sky-100 transform origin-top-left animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                    {shopItems.map((item, idx) => {
                      if (!item.href) return null;
                      return (
                        <Link
                          key={idx}
                          href={item.href}
                          className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-sky-50 hover:text-sky-600 font-medium transition-colors border-b border-sky-50 last:border-none"
                        >
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              <Link
                href="/career"
                className={`font-semibold tracking-wide text-sm uppercase transition-colors py-2 ${
                  pathname === "/career"
                    ? "text-sky-600"
                    : "text-slate-700 hover:text-sky-500"
                }`}
              >
                Career
              </Link>

              <Link
                href="/contact"
                className={`font-semibold tracking-wide text-sm uppercase transition-colors py-2 ${
                  pathname === "/contact"
                    ? "text-sky-600"
                    : "text-slate-700 hover:text-sky-500"
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Desktop Reduced Width Search Bar with Custom Placeholder */}
            <div className="relative" ref={searchRef}>
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center bg-sky-50/60 border border-sky-200 hover:border-sky-400 p-1 rounded-full relative shadow-sm transition-all focus-within:ring-2 focus-within:ring-sky-300 focus-within:bg-white"
              >
                <div className="flex items-center pl-2.5 pr-1 flex-1">
                  <svg
                    className="w-3.5 h-3.5 text-sky-500 mr-1.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeLinejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search product"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent text-slate-800 placeholder-slate-400 text-xs focus:outline-none w-28"
                  />
                </div>
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="text-slate-400 hover:text-slate-600 px-1 text-xs font-bold"
                  >
                    ✕
                  </button>
                )}
                <button
                  type="submit"
                  className="bg-sky-500 hover:bg-sky-600 text-white p-1.5 rounded-full transition-colors flex items-center justify-center shadow"
                  aria-label="Search"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeLinejoin="round"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>

                {/* Live Search Results Dropdown */}
                {searchQuery.trim() !== "" && (
                  <div className="absolute right-0 top-12 w-72 bg-white rounded-2xl shadow-2xl border border-sky-100 max-h-96 overflow-y-auto z-50 p-2 animate-in fade-in duration-200">
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => handleSelectProduct(product.slug)}
                          className="flex items-center space-x-3 p-2.5 hover:bg-sky-50/70 rounded-xl cursor-pointer transition-all border-b border-sky-50 last:border-none group"
                        >
                          <div className="relative w-10 h-10 flex-shrink-0 bg-slate-100 rounded-lg overflow-hidden border border-sky-100 shadow-inner">
                            <Image
                              src={
                                product.images?.[0]?.url || "/placeholder.png"
                              }
                              alt={product.images?.[0]?.alt || product.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-slate-800 truncate group-hover:text-sky-600 transition-colors">
                              {product.name}
                            </p>
                            <p className="text-[10px] text-sky-600 font-semibold uppercase tracking-wider">
                              {product.category}
                            </p>
                          </div>
                          <span className="text-slate-400 group-hover:text-sky-500 text-xs font-bold">
                            ↗
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center">
                        <div className="w-8 h-8 bg-sky-50 rounded-full flex items-center justify-center mx-auto mb-1 text-sky-500 text-xs">
                          🔍
                        </div>
                        <p className="text-xs font-bold text-slate-700">
                          No results found
                        </p>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          No match for &quot;{searchQuery}&quot;
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="lg:hidden flex items-center pr-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-3 rounded-2xl bg-sky-50 text-slate-700 hover:text-sky-600 hover:bg-sky-100 focus:outline-none transition-all shadow-sm"
              aria-label="Toggle Menu"
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

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-end">
          <div className="w-11/12 max-w-sm bg-white h-[100dvh] shadow-2xl flex flex-col p-6 animate-in slide-in-from-right duration-300">
            {/* Drawer Header (Logo without background/borders) */}
            <div className="flex items-center justify-between pb-4 border-b border-sky-100 flex-shrink-0 mb-3">
              <div className="relative w-14 h-14 overflow-hidden flex items-center justify-center">
                <Image
                  src="/logo/logo.png"
                  alt="Brand Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-11 h-11 rounded-full bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600 transition-colors shadow-md"
                aria-label="Close Menu"
              >
                <svg
                  className="w-6 h-6"
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

            {/* Mobile Nav Links */}
            <div className="flex-1 overflow-y-auto space-y-2.5 py-2 pr-1">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-4 rounded-2xl text-sm font-bold uppercase tracking-wider transition-all ${
                  pathname === "/"
                    ? "bg-sky-50 text-sky-600 shadow-sm"
                    : "text-slate-800 hover:bg-sky-50/50"
                }`}
              >
                <span>Home</span>
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${pathname === "/" ? "bg-sky-500 text-white" : "bg-sky-50 text-sky-600"}`}
                >
                  ↗
                </span>
              </Link>

              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-4 rounded-2xl text-sm font-semibold uppercase tracking-wider transition-all ${
                  pathname === "/about"
                    ? "bg-sky-50 text-sky-600 shadow-sm"
                    : "text-slate-800 hover:bg-sky-50/50"
                }`}
              >
                <span>About Us</span>
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${pathname === "/about" ? "bg-sky-500 text-white" : "bg-sky-50 text-sky-600"}`}
                >
                  ↗
                </span>
              </Link>

              {/* Shop Collapsible Dropdown in Mobile */}
              <div className="space-y-1">
                <div
                  onClick={() => setMobileShopOpen(!mobileShopOpen)}
                  className={`flex items-center justify-between px-4 py-4 rounded-2xl text-sm font-semibold uppercase tracking-wider cursor-pointer transition-all ${
                    pathname.startsWith("/shop")
                      ? "bg-sky-50 text-sky-600 shadow-sm"
                      : "text-slate-800 hover:bg-sky-50/50"
                  }`}
                >
                  <span>Shop Categories</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${mobileShopOpen ? "rotate-180 text-sky-500" : "text-slate-400"}`}
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
                </div>

                {mobileShopOpen && (
                  <div className="pl-3 space-y-1.5 pt-1 animate-in fade-in duration-200">
                    {shopItems.map((item, index) => {
                      if (!item.href) return null;
                      return (
                        <Link
                          key={index}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center justify-between pl-6 pr-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                            pathname === item.href
                              ? "bg-sky-50 text-sky-600 font-bold"
                              : "text-slate-600 hover:bg-sky-50 hover:text-sky-600"
                          }`}
                        >
                          <span>{item.name}</span>
                          <span className="text-xs text-slate-400 font-bold">
                            ↗
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              <Link
                href="/career"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-4 rounded-2xl text-sm font-semibold uppercase tracking-wider transition-all ${
                  pathname === "/career"
                    ? "bg-sky-50 text-sky-600 shadow-sm"
                    : "text-slate-800 hover:bg-sky-50/50"
                }`}
              >
                <span>Career</span>
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${pathname === "/career" ? "bg-sky-500 text-white" : "bg-sky-50 text-sky-600"}`}
                >
                  ↗
                </span>
              </Link>

              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-4 rounded-2xl text-sm font-semibold uppercase tracking-wider transition-all ${
                  pathname === "/contact"
                    ? "bg-sky-50 text-sky-600 shadow-sm"
                    : "text-slate-800 hover:bg-sky-50/50"
                }`}
              >
                <span>Contact Us</span>
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${pathname === "/contact" ? "bg-sky-500 text-white" : "bg-sky-50 text-sky-600"}`}
                >
                  ↗
                </span>
              </Link>
            </div>

            {/* Mobile Search Bar at the Bottom */}
            <div className="pt-3 border-t border-sky-100 flex-shrink-0 relative">
              {/* Mobile Live Results Dropdown */}
              {searchQuery.trim() !== "" && (
                <div className="absolute left-0 bottom-full mb-2 w-full bg-white rounded-2xl shadow-2xl border border-sky-100 max-h-60 overflow-y-auto z-50 p-2 animate-in fade-in duration-200">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleSelectProduct(product.slug)}
                        className="flex items-center space-x-3 p-3 hover:bg-sky-50 rounded-xl cursor-pointer transition-colors border-b border-sky-50 last:border-none group"
                      >
                        <div className="relative w-10 h-10 flex-shrink-0 bg-slate-100 rounded-lg overflow-hidden border border-sky-100">
                          <Image
                            src={product.images?.[0]?.url || "/placeholder.png"}
                            alt={product.images?.[0]?.alt || product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-800 truncate group-hover:text-sky-600">
                            {product.name}
                          </p>
                          <p className="text-[10px] text-sky-600 font-semibold uppercase tracking-wider">
                            {product.category}
                          </p>
                        </div>
                        <span className="text-slate-400 group-hover:text-sky-500 text-xs font-bold">
                          ↗
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center">
                      <p className="text-xs font-bold text-slate-700">
                        No products found
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        Try searching something else
                      </p>
                    </div>
                  )}
                </div>
              )}

              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center bg-sky-50/60 border border-sky-200 p-2.5 rounded-2xl relative shadow-inner focus-within:border-sky-400 focus-within:bg-white transition-all"
              >
                <div className="flex items-center pl-2 pr-2 flex-1">
                  <svg
                    className="w-4 h-4 text-sky-500 mr-2 flex-shrink-0"
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
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent text-slate-800 placeholder-slate-400 text-sm focus:outline-none w-full"
                  />
                </div>
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="text-slate-400 hover:text-slate-600 px-2 text-xs font-bold"
                  >
                    ✕
                  </button>
                )}
                <button
                  box-sizing="border-box"
                  type="submit"
                  className="bg-sky-500 hover:bg-sky-600 text-white p-2.5 rounded-xl transition-colors flex items-center justify-center shadow"
                  aria-label="Search"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
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
