"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function ProductsNewsAndMapSection() {
  return (
    <>
      {/* 1. Full-Width Products Section with #656565 Background & Overlay */}
      <section className="relative w-full min-h-[500px] lg:min-h-[400px] bg-[#656565] bg-[url('/home/list-bg.png')] bg-fixed bg-cover bg-center flex items-center justify-center py-10 sm:py-12 px-4 lg:px-12 overflow-hidden">
        {/* Background dark overlay */}
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center justify-between">
          {/* Left Side: Front Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="bg-white p-3 rounded-2xl shadow-xl w-full max-w-xl">
              <div className="relative w-full h-[300px] sm:h-[350px] md:h-[450px]">
                <Image
                  src="/home/Our-Products-List.png"
                  alt="Product Showcase"
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="rounded-lg object-contain"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* Right Side: Text List */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
            className="lg:col-span-6 lg:col-start-7 text-white px-2 lg:px-4"
          >
            <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-white tracking-wide text-center lg:text-left">
              Our Products List
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm lg:text-base">
              <ul className="space-y-1.5 list-disc list-inside text-gray-100">
                <li>Baking Paper Cups</li>
                <li>Customised Paper Cups</li>
                <li>Food Wrapping Sheets</li>
                <li>Sweet Box Wrapping Sheets</li>
                <li>Food Packaging Envelop</li>
                <li>Cake Base</li>
                <li>Pastry Base</li>
                <li>Cake Box</li>
                <li>Pizza Box</li>
              </ul>
              <ul className="space-y-1.5 list-disc list-inside text-gray-100">
                <li>Plum Cake Mould</li>
                <li>Brownie Mould</li>
                <li>Round Cake Mould</li>
                <li>Choco Lava Cup Mould</li>
                <li>Curl Cup Mould</li>
                <li>Pane Tonne Mould</li>
                <li>Tulip Cup Mould</li>
                <li>Plumpy Mould</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. What is Ahaar & News And Trends Section */}
      <section className="w-full bg-white py-10 sm:py-16 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center px-4">
          {/* What is Ahaar Header & Paragraph - Moves Left */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-10 sm:mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-sky-500 mb-4 sm:mb-6">
              What is Ahaar
            </h2>
            <p className="text-gray-700 max-w-3xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed">
              Ahaar 2023 is an international food and hospitality exhibition
              that took place in India. After conducting research, I found that
              Ahaar 2023 was the 37th edition of the event, which was held from
              March 14 to 18, 2023, at the Pragati Maidan in New Delhi, India.
            </p>
          </motion.div>

          {/* News And Trends Header - Moves Right */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            <h3 className="text-2xl lg:text-3xl font-bold text-sky-500 mb-8 sm:mb-12">
              News And Trends
            </h3>
          </motion.div>

          {/* News Cards Grid with Directional Stagger (Card 1 from Left, Card 2 from Right) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 text-left mb-12 sm:mb-20">
            {/* Card 1: Ahaar 2024 - Moves from Left */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              whileHover={{ y: -6 }}
              className="bg-white border border-gray-200 p-5 sm:p-6 rounded-lg shadow-md flex flex-col justify-between transition-shadow duration-300 hover:shadow-xl"
            >
              <div>
                <div className="relative w-full h-50 sm:h-70 mb-6 overflow-hidden rounded-md bg-gray-50">
                  <Image
                    src="/home/news1.jpeg"
                    alt="We Participate in Ahaar 2024"
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover"
                  />
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 text-center mb-3">
                  We Participate in Ahaar 2024
                </h4>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed text-center mb-6">
                  Participating in Ahaar 2024, India's premier food and
                  hospitality event, can be an exciting opportunity for
                  exhibitors to connect with potential customers and foster new
                  business relationships.
                </p>
              </div>
              <div className="text-center font-semibold text-gray-800 text-xs sm:text-sm">
                2024
              </div>
            </motion.div>

            {/* Card 2: Ahaar 2023 - Moves from Right */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
              whileHover={{ y: -6 }}
              className="bg-white border border-gray-200 p-5 sm:p-6 rounded-lg shadow-md flex flex-col justify-between transition-shadow duration-300 hover:shadow-xl"
            >
              <div>
                <div className="relative w-full h-50 sm:h-70 mb-6 overflow-hidden rounded-md bg-gray-50">
                  <Image
                    src="/home/news2.jpeg"
                    alt="We Participate in Ahaar 2023"
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover"
                  />
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 text-center mb-3">
                  We Participate in Ahaar 2023
                </h4>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed text-center mb-6">
                  Exhibitors can greatly benefit from participating in Ahaar
                  2023, as it offers a platform to establish connections with
                  potential clients and cultivate new business partnerships,
                  ultimately driving growth.
                </p>
              </div>
              <div className="text-center font-semibold text-gray-800 text-xs sm:text-sm">
                2023
              </div>
            </motion.div>
          </div>
        </div>

        {/* 3. Full-Screen Width Google Maps Embed Section (Edge-to-Edge on Mobile & Desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full overflow-hidden shadow-lg border-y border-gray-200"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3496.36927078621!2d77.07791730000001!2d28.7980676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1c305ac28ec7%3A0x3c3f8bbd3bfadd89!2sThe%20Pack%20Hub!5e0!3m2!1sen!2sin!4v1793171677977!5m2!1sen!2sin"
            width="100%"
            height="350"
            className="sm:h-[450px] w-full"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="The Pack Hub Location Map"
          />
        </motion.div>
      </section>
    </>
  );
}
