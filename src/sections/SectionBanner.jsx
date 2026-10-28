"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";

export default function SectionBanner() {
  const [mount, setMount] = useState(false);

  const bannerImages = [
    { id: 1, url: "/banner/b1.png", alt: "Banner Slide 1" },
    { id: 2, url: "/banner/b2.png", alt: "Banner Slide 2" },
  ];

  useEffect(() => {
    setMount(true);
  }, []);

  if (!mount) return null;

  return (
    <section className="relative w-full h-[35vh] sm:h-[45vh] lg:h-[80vh] overflow-hidden bg-[#EFEDE9] border-b border-sky-100 select-none">
      <Swiper
        modules={[Autoplay]}
        loop={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        speed={800}
        allowTouchMove={true}
        className="w-full h-full"
      >
        {bannerImages.map((slide) => (
          <SwiperSlide
            key={slide.id}
            className="relative w-full h-full flex items-center justify-center bg-[#EFEDE9]"
          >
            <div className="relative w-full h-full flex items-center justify-center p-2 sm:p-4">
              <Image
                src={slide.url}
                alt={slide.alt}
                fill
                priority
                quality={100}
                sizes="100vw"
                className="w-full h-full object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
