"use client";

import Breadcrumb from "@/components/Breadcrumb";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { motion } from "framer-motion";

const careerSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(80, "First name is too long"),
  lastName: z.string().trim().max(80, "Last name is too long"),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address")
    .max(254, "Email address is too long"),
  phone: z.string().regex(/^\d{10}$/, "Enter a valid 10-digit mobile number"),
  message: z
    .string()
    .trim()
    .min(5, "Message must be at least 5 characters")
    .max(5000, "Message must be 5000 characters or less"),
});

const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
};

export default function CareerPage() {
  const router = useRouter();
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleChange = (name, value) => {
    setFormData((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: undefined }));
    setServerError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    setErrors({});
    setServerError("");

    const result = careerSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0];
        if (!fieldErrors[fieldName]) fieldErrors[fieldName] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      setServerError(
        "The form is not configured yet. Please contact the site administrator.",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: "New Career Application from Labella",
          name: [result.data.firstName, result.data.lastName]
            .filter(Boolean)
            .join(" "),
          email: result.data.email,
          phone: `+91 ${result.data.phone}`,
          message: result.data.message,
        }),
      });

      let responseData;
      try {
        responseData = await response.json();
      } catch {
        throw new Error("The form service returned an unreadable response.");
      }

      if (!response.ok || !responseData.success) {
        throw new Error(
          responseData.message ||
            "Your application could not be submitted. Please try again.",
        );
      }

      sessionStorage.setItem("isAuthorizedThankYou", "true");
      router.push("/thank-you");
    } catch (error) {
      setServerError(
        error.message ||
          "Network error. Please check your connection and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (fieldName) =>
    `w-full rounded-xl border bg-white px-4 py-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#0084D1] focus:ring-4 focus:ring-[#0084D1]/10 ${errors[fieldName] ? "border-red-400" : "border-slate-200"}`;

  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f9fc] pb-20 font-sans text-slate-800">
      <Breadcrumb title="Career" />

      <section className="relative isolate px-5 py-14 md:px-8 md:py-20">
        <div className="pointer-events-none absolute -left-40 top-20 -z-10 h-96 w-96 rounded-full bg-sky-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-96 w-96 rounded-full bg-blue-100/70 blur-3xl" />

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="mb-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0084D1] shadow-sm">
                <span className="h-2 w-2 rounded-full bg-[#0084D1]" />
                Careers at Labella
              </span>
              <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight text-slate-900 md:text-5xl">
                Build your future
                <span className="block text-[#0084D1]">with us.</span>
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
                Bring your talent and ideas to a team shaping the future of
                bakery mould paper solutions.
              </p>
            </div>

            <div className="group rounded-3xl border border-white bg-white/90 p-7 shadow-[0_18px_60px_-25px_rgba(15,67,110,0.22)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_-25px_rgba(15,67,110,0.3)] md:p-9">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-[#0084D1]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <path
                    d="M12 3.5 14.2 8l4.9.7-3.55 3.46.84 4.89L12 14.74l-4.39 2.31.84-4.89L4.9 8.7 9.8 8 12 3.5Z"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinejoin="round"
                  />
                  <path
                    d="m9.5 11.7 1.65 1.65 3.45-3.5"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
                Equal Opportunity Employer
              </h2>
              <p className="mt-3 text-[15px] leading-7 text-slate-600">
                Labella is an equal opportunity employer and welcomes
                applications from diverse candidates. We are committed to
                creating an inclusive and welcoming work environment that values
                diversity, equity, and inclusion.
              </p>
            </div>

            <div className="group rounded-3xl border border-white bg-white/90 p-7 shadow-[0_18px_60px_-25px_rgba(15,67,110,0.22)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_-25px_rgba(15,67,110,0.3)] md:p-9">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-[#0084D1]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <path
                    d="M4 19.5h16M6 19.5V9l6-4.5L18 9v10.5M9 19.5v-6h6v6M9 9.5h.01M15 9.5h.01"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
                Work With Us
              </h2>
              <p className="mt-3 text-[15px] leading-7 text-slate-600">
                At Labella , we’re passionate about revolutionizing the baking
                industry with our cutting-edge bakery mould paper solutions.
                We’re always on the lookout for talented individuals who share
                our vision and are eager to make a difference.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
            className="overflow-hidden rounded-3xl border border-white bg-white shadow-[0_25px_90px_-35px_rgba(15,67,110,0.32)]"
          >
            <div className="relative overflow-hidden bg-gradient-to-br from-[#0077bd] via-[#0084D1] to-[#21a2e8] px-7 py-8 text-white md:px-10 md:py-9">
              <div className="absolute -right-10 -top-20 h-56 w-56 rounded-full border-[28px] border-white/10" />
              <div className="absolute -bottom-20 right-24 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
              <div className="relative">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-100">
                  Take the next step
                </p>
                <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
                  Apply to join us
                </h2>
                <p className="mt-2 text-sm leading-6 text-sky-50">
                  Share your details and our team will be in touch.
                </p>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-5 p-7 md:p-10"
            >
              {serverError && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {serverError}
                </div>
              )}

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    className="mb-2 block text-sm font-semibold text-slate-700"
                    htmlFor="firstName"
                  >
                    First name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    value={formData.firstName}
                    onChange={(event) =>
                      handleChange("firstName", event.target.value)
                    }
                    placeholder="Your first name"
                    aria-invalid={Boolean(errors.firstName)}
                    aria-describedby={
                      errors.firstName ? "firstName-error" : undefined
                    }
                    className={inputClass("firstName")}
                  />
                  {errors.firstName && (
                    <span
                      id="firstName-error"
                      className="mt-1.5 block text-xs font-medium text-red-600"
                    >
                      {errors.firstName}
                    </span>
                  )}
                </div>

                <div>
                  <label
                    className="mb-2 block text-sm font-semibold text-slate-700"
                    htmlFor="lastName"
                  >
                    Last name{" "}
                    <span className="font-normal text-slate-400">
                      (optional)
                    </span>
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    value={formData.lastName}
                    onChange={(event) =>
                      handleChange("lastName", event.target.value)
                    }
                    placeholder="Your last name"
                    aria-invalid={Boolean(errors.lastName)}
                    aria-describedby={
                      errors.lastName ? "lastName-error" : undefined
                    }
                    className={inputClass("lastName")}
                  />
                  {errors.lastName && (
                    <span
                      id="lastName-error"
                      className="mt-1.5 block text-xs font-medium text-red-600"
                    >
                      {errors.lastName}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label
                  className="mb-2 block text-sm font-semibold text-slate-700"
                  htmlFor="email"
                >
                  Email address <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={(event) =>
                    handleChange("email", event.target.value)
                  }
                  placeholder="you@example.com"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={inputClass("email")}
                />
                {errors.email && (
                  <span
                    id="email-error"
                    className="mt-1.5 block text-xs font-medium text-red-600"
                  >
                    {errors.email}
                  </span>
                )}
              </div>

              <div>
                <label
                  className="mb-2 block text-sm font-semibold text-slate-700"
                  htmlFor="phone"
                >
                  Mobile number <span className="text-red-500">*</span>
                </label>
                <div
                  className={`flex w-full overflow-hidden rounded-xl border bg-white transition focus-within:ring-4 focus-within:ring-[#0084D1]/10 ${errors.phone ? "border-red-400" : "border-slate-200 focus-within:border-[#0084D1]"}`}
                >
                  <span className="flex items-center gap-2 border-r border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-600">
                    <span aria-hidden="true">🇮🇳</span> +91
                  </span>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    maxLength={10}
                    value={formData.phone}
                    onChange={(event) =>
                      handleChange(
                        "phone",
                        event.target.value.replace(/\D/g, "").slice(0, 10),
                      )
                    }
                    placeholder="10-digit mobile number"
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    className="min-w-0 flex-1 px-4 py-3.5 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                  />
                </div>
                {errors.phone && (
                  <span
                    id="phone-error"
                    className="mt-1.5 block text-xs font-medium text-red-600"
                  >
                    {errors.phone}
                  </span>
                )}
              </div>

              <div>
                <label
                  className="mb-2 block text-sm font-semibold text-slate-700"
                  htmlFor="message"
                >
                  Comment or message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  maxLength={5000}
                  value={formData.message}
                  onChange={(event) =>
                    handleChange("message", event.target.value)
                  }
                  placeholder="Tell us a little about yourself..."
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                  className={`${inputClass("message")} resize-y`}
                />
                <div className="mt-1.5 flex items-start justify-between gap-3">
                  {errors.message ? (
                    <span
                      id="message-error"
                      className="text-xs font-medium text-red-600"
                    >
                      {errors.message}
                    </span>
                  ) : (
                    <span className="text-xs text-slate-400">
                      Minimum 5 characters
                    </span>
                  )}
                  <span className="shrink-0 text-xs text-slate-400">
                    {formData.message.length}/5000
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#0084D1] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-sky-900/15 transition duration-200 hover:-translate-y-0.5 hover:bg-[#0073b8] hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#0084D1]/25 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
                {!isSubmitting && (
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
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
                )}
              </button>
              <p className="text-center text-xs leading-5 text-slate-400">
                Fields marked with <span className="text-red-500">*</span> are
                required.
              </p>
            </form>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
