import { products } from "@/lib/data.js";

const BASE_URL = "https://www.labellacarta.co.in";

function createCategorySlug(category) {
  return category
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function sitemap() {
  const lastModified = new Date();

  const pages = ["", "about/", "shop/", "career/", "contact/"].map((path) => ({
    url: `${BASE_URL}/${path}`,
    lastModified,
    changeFrequency: "daily",
    priority: path === "" ? 1 : 0.8,
  }));

  const categories = [
    ...new Set(products.flatMap((product) => product.category)),
  ].map((category) => ({
    url: `${BASE_URL}/product-category/${createCategorySlug(category)}/`,
    lastModified,
    changeFrequency: "daily",
    priority: 0.7,
  }));

  const productPages = products.map((product) => ({
    url: `${BASE_URL}/product/${product.slug}/`,
    lastModified,
    changeFrequency: "daily",
    priority: 0.7,
  }));

  return [...pages, ...categories, ...productPages];
}
