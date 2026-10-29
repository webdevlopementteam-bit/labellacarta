"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function Breadcrumb({ title }) {
  const pathname = usePathname();

  // 1. आपके shopItems के हिसाब से routes की mapping (b1, b2, b3, b4 को आपस में cycle किया गया है)
  const routeConfig = {
    "/shop/box": {
      image: "/breadcrump/b1.png",
      defaultTitle: "Box",
    },
    "/shop/cake": {
      image: "/breadcrump/b2.png",
      defaultTitle: "Cake",
    },
    "/shop/envelop": {
      image: "/breadcrump/b3.png",
      defaultTitle: "Envelop",
    },
    "/shop/food-wrapping": {
      image: "/breadcrump/b4.png",
      defaultTitle: "Food Wrapping",
    },
    "/shop/moulds": {
      image: "/breadcrump/b2.png",
      defaultTitle: "Moulds",
    },
    "/shop/paper-cups": {
      image: "/breadcrump/b2.png",
      defaultTitle: "Paper Cups",
    },
    "/shop/sheet": {
      image: "/breadcrump/b3.png",
      defaultTitle: "Sheet",
    },
    "/about": {
      image: "/breadcrump/b1.png",
      defaultTitle: "Moulds",
    },
    "/contact": {
      image: "/breadcrump/b4.png",
      defaultTitle: "Paper Cups",
    },
    "/shop": {
      image: "/breadcrump/b1.png",
      defaultTitle: "Sheet",
    },
  };

  // 2. Current route के लिए config ढूंढना (अगर मैच न हो तो fallback set करना)
  const currentConfig = routeConfig[pathname] || {
    image: "/breadcrump/b1.png",
    defaultTitle: "Shop",
  };

  // 3. Props या default title का चयन
  const displayTitle = title || currentConfig.defaultTitle;
  const displayImage = currentConfig.image;

  // 4. Breadcrumb paths बनाने के लिए helper (जैसे /shop/box -> ["Shop", "Box"])
  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <div className="relative w-full h-[250px] md:h-[350px] flex items-center justify-center overflow-hidden">
      {/* Background Image with smooth hover/zoom feel */}
      <Image
        src={displayImage}
        alt={displayTitle}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center transform scale-105 transition-transform duration-700 ease-out"
      />

      {/* Rich Gradient Overlay for better depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 backdrop-brightness-90" />

      {/* Dynamic Title & Modern Breadcrumb */}
      <div className="relative z-10 text-center text-white px-4 animate-fade-in">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight drop-shadow-md">
          {displayTitle}
        </h1>

        {/* Modern Breadcrumb Trail */}
        <div className="flex items-center justify-center space-x-2 text-xs md:text-sm mt-3 text-gray-200 font-medium tracking-wide">
          <Link
            href="/"
            className="text-white transition-colors hover:text-[#00A6F4] hover:font-extrabold"
          >
            Home
          </Link>
          {pathSegments.map((segment, index) => {
            const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
            const isLast = index === pathSegments.length - 1;
            const formattedSegment = segment.replace(/-/g, " ");

            return (
              <span key={href} className="flex items-center space-x-2">
                <span className="text-gray-400">/</span>
                {isLast ? (
                  <span className="capitalize text-primary font-semibold text-white/90">
                    {formattedSegment}
                  </span>
                ) : (
                  <Link
                    href={href}
                    className="capitalize hover:text-white transition-colors"
                  >
                    {formattedSegment}
                  </Link>
                )}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
