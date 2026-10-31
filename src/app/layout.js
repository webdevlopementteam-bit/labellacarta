import { Poppins } from "next/font/google";
import "./globals.css";
import NavbarComponent from "@/components/NavbarComponent";
import Footer from "@/components/Footer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  metadataBase: new URL("https://www.labellacarta.co.in"),
  title: {
    default: "Labella",
    template: "%s – Labella",
  },
  description:
    "Labella responds to the needs of each client by offering targeted solutions and services for the food industry, professionals in the confectionery sector and for large retailers.",
  icons: {
    icon: "/logo/logo.webp",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-poppins" suppressHydrationWarning>
        <NavbarComponent />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
