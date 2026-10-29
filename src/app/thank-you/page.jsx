"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ThankYouPage() {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const authorized =
      sessionStorage.getItem("isAuthorizedThankYou") === "true";

    if (authorized) {
      sessionStorage.removeItem("isAuthorizedThankYou");
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
      router.replace("/");
    }
  }, [router]);

  if (isAuthorized === null || !isAuthorized) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f9fc] px-5">
        <div
          className="h-10 w-10 animate-spin rounded-full border-4 border-sky-100 border-t-[#0084D1]"
          role="status"
          aria-label="Loading"
        />
      </main>
    );
  }

  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[#f5f9fc] px-5 py-16 font-sans text-slate-800">
      <div className="pointer-events-none absolute -left-40 top-10 -z-10 h-96 w-96 rounded-full bg-sky-200/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-96 w-96 rounded-full bg-blue-100/80 blur-3xl" />

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-2xl overflow-hidden rounded-3xl border border-white bg-white text-center shadow-[0_25px_90px_-35px_rgba(15,67,110,0.3)]"
      >
        <div className="relative overflow-hidden bg-gradient-to-br from-[#0077bd] via-[#0084D1] to-[#21a2e8] px-7 py-12 text-white md:px-12 md:py-16">
          <div className="absolute -right-10 -top-20 h-56 w-56 rounded-full border-[28px] border-white/10" />
          <div className="absolute -bottom-28 left-8 h-52 w-52 rounded-full bg-white/10 blur-2xl" />

          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 180,
              damping: 14,
            }}
            className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-white/30 bg-white/15 shadow-inner backdrop-blur-sm"
          >
            <svg
              viewBox="0 0 48 48"
              fill="none"
              className="h-12 w-12"
              aria-hidden="true"
            >
              <path
                d="m13 24.5 7.2 7.2L35 17"
                stroke="white"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>

          <p className="relative mt-7 text-xs font-bold uppercase tracking-[0.22em] text-sky-100">
            Application received
          </p>
          <h1 className="relative mt-3 text-4xl font-black tracking-tight md:text-5xl">
            Thank you!
          </h1>
          <p className="relative mx-auto mt-4 max-w-md text-base leading-7 text-sky-50">
            Your application has been submitted successfully. We appreciate your
            interest in joining Labella.
          </p>
        </div>

        <div className="px-7 py-9 md:px-12 md:py-10">
          <div className="mx-auto max-w-md rounded-2xl border border-sky-100 bg-sky-50/70 p-5 text-left">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#0084D1] shadow-sm">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path
                    d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5v-11Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <path
                    d="m5 7 7 5 7-5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h2 className="font-bold text-slate-900">What happens next?</h2>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Our team will review your application. If your experience
                  matches an opportunity, we’ll get in touch using the contact
                  details you provided.
                </p>
              </div>
            </div>
          </div>

          <Link
            href="/"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-[#0084D1] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-sky-900/15 transition hover:-translate-y-0.5 hover:bg-[#0073b8] focus:outline-none focus:ring-4 focus:ring-[#0084D1]/25"
          >
            Back to home
            <svg
              viewBox="0 0 20 20"
              fill="none"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path
                d="M3.5 10h13m0 0-5-5m5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          <p className="mt-6 text-xs text-slate-400">
            Thank you for considering a future with Labella.
          </p>
        </div>
      </motion.section>
    </main>
  );
}
