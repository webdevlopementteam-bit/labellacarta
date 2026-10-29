import Breadcrumb from "@/components/Breadcrumb";
import Image from "next/image";
import React from "react";

function Page() {
  return (
    <div className="w-full bg-slate-50 text-slate-800 font-sans">
      {/* 1. Dynamic Breadcrumb Component */}
      <Breadcrumb title={"About Us"} />

      {/* 2. INTRODUCTION & WORLD MAP SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left / Text Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Crafting Excellence in{" "}
              <span className="text-blue-600">Bakery Packaging</span>
            </h2>
            <p className="text-slate-600 leading-relaxed text-base md:text-lg">
              <strong className="text-slate-900">The Pack Hub</strong>,
              established in 2022, and{" "}
              <strong className="text-slate-900">Labella</strong>established in
              2023, are well-known manufacturers, exporters, and suppliers of a
              broad range of bakery items We offer our client a finest range of
              Baking Cup Paper, wrapping sheets Printed Cake Box, and Cake Base
              Gold. These products are manufactured making use of optimum
              quality raw material by our skilled employees in conformity with
              universal market standards. Owing to optimum quality, quality
              paper, elegant design and fine finish, these products are widely
              recognized amongst clientele.
            </p>
            <p className="text-slate-600 leading-relaxed text-base">
              Industries are expanding and acknowledging the use of paper
              products. Our wide range of paper products are customized
              according to the customers’ demand. We supply our baking paper
              cups in Delhi NCR and different parts of India. Our products are
              high in demand in all the sectors be it bakery, hotels,
              restaurants, railways, airways, etc. Our products are manufactured
              with all the precision and are delivered after various quality
              checks. We also take care of our clients’ other demands like
              printing logo, image, brand promotion, etc. We take pride in being
              recognized as the best disposable paper cups manufacturer in
              India.
            </p>
          </div>

          {/* Right / World Map Image */}
          <div className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <Image
              src="/about/world.png"
              alt="Global Reach World Map"
              fill
              className="object-contain p-4"
              priority
            />
          </div>
        </div>
      </section>

      {/* 3. VISION & MISSION CARDS SECTION */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Our Vision Card */}
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-slate-100 transition-transform duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-bold text-xl mb-6">
              🎯
            </div>
            <h3 className="text-2xl font-bold text-blue-900 mb-4">
              Our Vision
            </h3>
            <p className="text-slate-600 leading-relaxed">
              To be the preferred partner for innovative and sustainable bakery
              packaging solutions, enhancing the success of our customers. Our
              unwavering commitment to customer satisfaction drives us to offer
              unparalleled customization options, ensuring that every order
              perfectly aligns with our clients’ unique vision. We are proud to
              serve a diverse clientele, including renowned bakeries, upscale
              hotels, and popular restaurants across India.
            </p>
          </div>

          {/* Our Mission Card */}
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-slate-100 transition-transform duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-bold text-xl mb-6">
              🚀
            </div>
            <h3 className="text-2xl font-bold text-blue-900 mb-4">
              Our Mission
            </h3>
            <p className="text-slate-600 leading-relaxed">
              To be the leading provider of innovative and sustainable bakery
              packaging solutions, empowering our customers to elevate their
              brand and delight their consumers. Delivering exceptional bakery
              packaging solutions that enhance product presentation, drive
              customer satisfaction, and contribute to a sustainable future.
              Crafting customized, high-quality bakery packaging that inspires
              creativity and elevates the customer experience.
            </p>
          </div>
        </div>
      </section>

      {/* 4. SUSTAINABILITY SECTION WITH FIXED BG & #454444 + GRAY EFFECT OVERLAY */}
      <section
        className="relative w-full h-[450px] md:h-[550px] flex items-center justify-center bg-fixed bg-center bg-cover overflow-hidden"
        style={{ backgroundImage: `url('/about/bg.png')` }}
      >
        {/* #454444 के साथ हल्का ग्रे टिनट इफ़ेक्ट */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundColor: "#454444",
            opacity: 0.65,
            mixBlendMode: "multiply",
          }}
        />

        {/* एक अतिरिक्त हल्का डार्क लेयर ताकि कंट्रास्ट और परफेक्ट हो जाए */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto text-center px-6 text-white space-y-4">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Sustainability
          </h2>
          <p className="text-slate-100 text-sm md:text-lg leading-relaxed max-w-2xl mx-auto">
            Focusing on sustainability demonstrates your commitment to
            environmental responsibility and can resonate strongly with
            environmentally conscious consumers.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Page;
