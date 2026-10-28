"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";

export default function SolutionsAndFeaturedSection() {
  const [mount, setMount] = useState(false);

  const solutionsImages = [
    { id: 1, url: "/home/s1.jpg", alt: "Solution Slide 1" },
    { id: 2, url: "/home/s2.jpg", alt: "Solution Slide 2" },
    { id: 3, url: "/home/s3.jpg", alt: "Solution Slide 3" },
    { id: 4, url: "/home/s4.jpg", alt: "Solution Slide 4" },
    { id: 5, url: "/home/s5.jpg", alt: "Solution Slide 5" },
    { id: 6, url: "/home/s6.jpg", alt: "Solution Slide 6" },
  ];

  useEffect(() => {
    setMount(true);
  }, []);

  if (!mount) return null;

  return (
    <section className="w-full bg-[#FBFBFC] py-14 md:py-20 px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-7xl mx-auto space-y-16 md:space-y-24">
        {/* --- SOLUTIONS AND SERVICES SECTION --- */}
        <div className="w-full space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-[750] tracking-tight text-[#0092E4]">
              SOLUTIONS AND SERVICES
            </h2>
            <p className="text-sm sm:text-base text-gray-900 leading-relaxed font-normal">
              Labella responds to the needs of each client by offering targeted
              solutions and services for the food industry, professionals in the
              confectionery sector and for large retailers.
            </p>
          </div>

          {/* Solutions Swiper */}
          <div className="w-full pt-2 pb-8">
            <Swiper
              modules={[Autoplay]}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              speed={800}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                },
              }}
              className="w-full pb-10"
            >
              {solutionsImages.map((slide) => (
                <SwiperSlide key={slide.id} className="h-auto">
                  <div className="relative w-full aspect-square bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex items-center justify-center p-2">
                    <Image
                      src={slide.url}
                      alt={slide.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* --- FEATURED SECTION (Enhanced Card) --- */}
        <div className="w-full bg-white rounded-3xl border border-gray-100/80 shadow-xl shadow-gray-100/60 p-8 sm:p-10 md:p-14 transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0092E4]">
                  Featured
                </h3>
                <h4 className="text-3xl sm:text-4xl  font-bold text-[#0092E4] tracking-tight leading-tight">
                  Baking Paper Cups
                </h4>
              </div>

              <p className="text-base sm:text-lg text-gray-900 leading-relaxed font-normal">
                Baking paper cups are a fantastic way to display and share
                treats. They can be used to bake cupcakes, sweet breads,
                cheesecakes, and brownies in the oven at temperatures up to 375
                degrees. To use them, simply place the cup on a cookie sheet,
                add your batter, and bake. No need for additional liners or
                cooking spray! When filling the cups, it&apos;s best to fill
                them about 1/2 way for fluffy cake batter, or 3/4 of the way if
                you want the cake to pop up above the rim. One box of cake mix
                can make 16 cupcakes if you fill each cup halfway. To eat a
                cupcake from a baking cup, you can use a fork or spoon, or
                simply tear the paper wrapper at the seam. Note that baking cups
                are not reusable and are made of paper.
              </p>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-5">
              <div className="relative w-full aspect-square flex items-center justify-center bg-[#FFFFFF] rounded-2xl p-6 overflow-hidden border border-gray-100 shadow-inner group">
                <Image
                  src="/home/f1.jpg"
                  alt="Baking Paper Cups Featured"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
