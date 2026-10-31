export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/thank-you/" },
    sitemap: "https://www.labellacarta.co.in/sitemap.xml",
  };
}
