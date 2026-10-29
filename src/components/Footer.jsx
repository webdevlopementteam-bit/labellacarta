"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, ChevronsRight } from "lucide-react";

const shopItems = [
  { name: "Box", href: "/product-category/box" },
  { name: "Cake", href: "/product-category/cake" },
  { name: "Envelop", href: "/product-category/envelop" },
  { name: "Food Wrapping", href: "/product-category/food-wrapping" },
  { name: "Moulds", href: "/product-category/moulds" },
  { name: "Paper Cups", href: "/product-category/paper-cups" },
  { name: "Sheet", href: "/product-category/sheet" },
];

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Products", href: "/shop" },
  { name: "Career", href: "/career" },
  { name: "Contact", href: "/contact" },
];

const headingClass = "mb-5 text-xl font-bold text-white sm:text-2xl";

const linkClass =
  "group inline-flex items-center gap-2.5 text-base text-sky-50 transition-colors duration-200 hover:text-white sm:text-lg";

function FooterLink({ href, children }) {
  return (
    <Link href={href} className={linkClass}>
      <ChevronsRight
        aria-hidden="true"
        className="h-5 w-5 shrink-0 text-white transition-transform duration-200 group-hover:translate-x-1"
        strokeWidth={2.5}
      />
      <span>{children}</span>
    </Link>
  );
}

function ContactRow({ icon: Icon, children }) {
  return (
    <div className="flex items-center gap-3">
      <Icon
        aria-hidden="true"
        className="h-5 w-5 shrink-0 text-white sm:h-[22px] sm:w-[22px]"
      />
      <div className="min-w-0 text-base leading-7 text-sky-50 sm:text-lg">
        {children}
      </div>
    </div>
  );
}

export default function Footer() {
  const [year, setYear] = useState(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="w-full overflow-hidden bg-[#005486] text-white">
      {/* Decorative top edge */}
      <div className="relative h-7 w-full sm:h-8">
        <Image
          src="/home/footer-line.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <div className="mx-auto max-w-8xl px-6 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-x-12"
        >
          {/* About */}
          <div className="lg:col-span-4">
            <h2 className={headingClass}>About</h2>
            <p className="max-w-md text-base leading-8 text-sky-50 sm:text-lg">
              Labella responds to the needs of each client by offering targeted
              solutions and services for the food industry, professionals in the
              confectionery sector, and large retailers.
            </p>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer navigation" className="lg:col-span-2">
            <h2 className={headingClass}>Quick Links</h2>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <FooterLink href={link.href}>{link.name}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Products */}
          <nav aria-label="Shop categories" className="lg:col-span-2">
            <h2 className={headingClass}>Products</h2>
            <ul className="space-y-3">
              {shopItems.map((item) => (
                <li key={item.name}>
                  <FooterLink href={item.href}>{item.name}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Office address */}
          <div className="lg:col-span-4">
            <h2 className={headingClass}>Office Address</h2>
            <div className="space-y-4">
              <ContactRow icon={MapPin}>
                <p>H-4, Sector-5 DSIIDC, Bawana, New Delhi - 110039, India</p>
              </ContactRow>

              <ContactRow icon={Mail}>
                <a
                  href="mailto:theppackhup@gmail.com"
                  className="break-all transition-colors hover:text-white"
                >
                  theppackhup@gmail.com
                </a>
              </ContactRow>

              <ContactRow icon={Phone}>
                <div className="flex flex-col">
                  <a
                    href="tel:+919650033010"
                    className="transition-colors hover:text-white"
                  >
                    +91 965-003-3010
                  </a>
                  <a
                    href="tel:+918233040303"
                    className="transition-colors hover:text-white"
                  >
                    +91 823-304-0303
                  </a>
                </div>
              </ContactRow>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-white/15 bg-[#33769E] py-4">
        <p className="px-4 text-center text-sm text-white sm:text-base">
          Copyright &copy; {year ?? ""} Labella | Powered by{" "}
          <a
            href="https://www.cybertricksmedia.com/"
            className="font-semibold text-[#FF9900] hover:text-amber-300"
          >
            CYBERTRICKS Media Pvt Ltd
          </a>
        </p>
      </div>
    </footer>
  );
}
