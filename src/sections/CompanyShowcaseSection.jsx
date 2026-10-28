"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function CompanyShowcaseSection({
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px",
}) {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white text-slate-800 overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-20">
        {/* ================= 1. WE SUPPORT ================= */}
        <div className="space-y-10 sm:space-y-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center space-y-3"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-sky-500 inline-block relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-1 after:bg-sky-400 after:rounded-full">
              We Support
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="bg-white p-6 sm:p-8 rounded-2xl border border-sky-100 shadow-sm hover:border-sky-300 transition-all flex items-center justify-center min-h-[300px] sm:min-h-[380px] w-full"
            >
              <div className="relative w-full h-60 sm:h-72">
                <Image
                  src="/home/we-support1.png"
                  alt="Swachh Bharat Support"
                  fill
                  sizes={sizes}
                  className="object-contain"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              className="bg-white p-6 sm:p-8 rounded-2xl border border-sky-100 shadow-sm hover:border-sky-300 transition-all flex items-center justify-center min-h-[300px] sm:min-h-[380px] w-full"
            >
              <div className="relative w-full h-60 sm:h-72">
                <Image
                  src="/home/we-support2.jpeg"
                  alt="Make In India Support"
                  fill
                  sizes={sizes}
                  className="object-contain"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* ================= 2. INNOVATION ================= */}
        <div className="pt-10 sm:pt-12 border-t border-sky-100">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center space-y-3 mb-10 sm:mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-sky-500 inline-block relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-1 after:bg-sky-400 after:rounded-full">
              Innovation
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="bg-white p-6 sm:p-8 rounded-2xl border border-sky-100 shadow-sm hover:border-sky-300 transition-all flex items-center justify-center min-h-[340px] sm:min-h-[400px] w-full"
            >
              <div className="relative w-full h-72 sm:h-84">
                <Image
                  src="/home/innovation.jpg"
                  alt="Innovation Baking Cups"
                  fill
                  sizes={sizes}
                  className="object-contain"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              className="space-y-4 text-slate-600 text-base sm:text-lg leading-relaxed px-2 sm:px-4"
            >
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="h-2 w-2 mt-2.5 rounded-full bg-sky-400 shrink-0" />
                  <span>
                    <strong className="text-slate-900 font-semibold">
                      Convenience:
                    </strong>{" "}
                    Products that are easy to use, store, and dispose of.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-2 w-2 mt-2.5 rounded-full bg-sky-400 shrink-0" />
                  <span>
                    <strong className="text-slate-900 font-semibold">
                      Durability:
                    </strong>{" "}
                    Packaging that protects food without adding unnecessary
                    bulk.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-2 w-2 mt-2.5 rounded-full bg-sky-400 shrink-0" />
                  <span>
                    <strong className="text-slate-900 font-semibold">
                      Aesthetics:
                    </strong>{" "}
                    Appealing designs that enhance the presentation of baked
                    goods.
                  </span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* ================= 3. RESEARCH & DEVELOPMENT ================= */}
        <div className="pt-10 sm:pt-12 border-t border-sky-100">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center space-y-3 mb-10 sm:mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-sky-500 inline-block relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-1 after:bg-sky-400 after:rounded-full">
              Research & Development
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="bg-white p-4 sm:p-8 rounded-2xl border border-sky-100 shadow-sm hover:border-sky-300 transition-all flex items-center justify-center min-h-[260px] sm:min-h-[400px] w-full order-2 md:order-1"
            >
              <div className="relative w-full h-64 sm:h-84">
                <Image
                  src="/home/research.png"
                  alt="Research and Development Plant"
                  fill
                  sizes={sizes}
                  className="object-contain"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              className="space-y-4 text-slate-600 leading-relaxed text-base sm:text-lg px-2 sm:px-4 order-1 md:order-2"
            >
              <p>
                Bakery mould paper, also known as baking paper or parchment
                paper, is a type of paper used in baking to prevent food from
                sticking to surfaces. The paper is designed to withstand high
                temperatures and is often coated with a non-stick material to
                ensure easy food release.
              </p>
              <p>
                With the increasing demand for baked goods and the need for
                efficient and convenient baking solutions, research and
                development in bakery mould paper is crucial to improve its
                performance and functionality.
              </p>
            </motion.div>
          </div>
        </div>

        {/* ================= 4. CERTIFICATION ================= */}
        <div className="pt-10 sm:pt-12 border-t border-sky-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Column: Heading + Text stacked vertically */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="space-y-6 px-2 sm:px-4"
            >
              <div className="space-y-3">
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-sky-500 inline-block relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1 after:bg-sky-400 after:rounded-full">
                  Certification
                </h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
                We have distributors in all india and also out of india in many
                countries . we can provide food grade certificates for our
                clients.
              </p>
            </motion.div>

            {/* Right Column: Certificate Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              className="bg-white p-6 sm:p-8 rounded-2xl border border-sky-100 shadow-sm hover:border-sky-300 transition-all flex items-center justify-center min-h-[380px] sm:min-h-[450px] w-full"
            >
              <div className="relative w-full h-[350px] sm:h-[420px]">
                <Image
                  src="/home/certificate.jpg"
                  alt="ISO 9001:2015 Certificate of Registration"
                  fill
                  sizes={sizes}
                  className="object-contain"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
