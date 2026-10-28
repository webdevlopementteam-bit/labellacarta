"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";

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
      image: "/breadcrump/b1.png",
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
  };

  // 2. Current route के लिए config ढूंढना (अगर मैच न हो तो fallback set करना)
  const currentConfig = routeConfig[pathname] || {
    image: "/breadcrump/b1.png",
    defaultTitle: "Shop",
  };

  // 3. Props या default title का चयन
  const displayTitle = title || currentConfig.defaultTitle;
  const displayImage = currentConfig.image;

  return (
    <div className="relative w-full h-[250px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src={displayImage}
        alt={displayTitle}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Dynamic Title */}
      <div className="relative z-10 text-center text-white">
        <h1 className="text-3xl md:text-4xl font-bold">{displayTitle}</h1>
        <p className="text-sm mt-2">Home {pathname}</p>
      </div>
    </div>
  );
}
