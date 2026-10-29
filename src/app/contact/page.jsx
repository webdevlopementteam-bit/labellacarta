"use client";

import Breadcrumb from "@/components/Breadcrumb";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { motion } from "framer-motion";

const contactSchema = z.object({
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

const contactDetails = [
  {
    title: "Contact Number",
    lines: ["+91 965-003-3010", "+91 8233040303"],
    href: ["tel:+919650033010", "tel:+918233040303"],
    icon: "phone",
  },
  {
    title: "Email",
    lines: ["thepackhup@gmail.com"],
    href: ["mailto:thepackhup@gmail.com"],
    icon: "email",
  },
  {
    title: "Address",
    lines: ["H-4, Sector-5 DSIIDC, BAWANA,", "New Delhi -110039 (INDIA)"],
    icon: "location",
  },
];

function ContactIcon({ type }) {
  if (type === "email") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <path
          d="M3.5 6.5A2.5 2.5 0 0 1 6 4h12a2.5 2.5 0 0 1 2.5 2.5v11A2.5 2.5 0 0 1 18 20H6a2.5 2.5 0 0 1-2.5-2.5v-11Z"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <path
          d="m4.5 6 7.5 6 7.5-6"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "location") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <path
          d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <circle
          cx="12"
          cy="10"
          r="2.3"
          stroke="currentColor"
          strokeWidth="1.7"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <path
        d="M7.2 3.8 10 7.5 8.2 9.3c1.1 2.2 2.8 3.9 5 5l1.8-1.8 3.7 2.8-.8 3.3c-.2.8-1 1.4-1.8 1.3C9.4 19 5 14.6 4.1 7.9c-.1-.8.4-1.6 1.3-1.8l1.8-.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function ContactPage() {
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

    const result = contactSchema.safeParse(formData);

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
        "The contact form is not configured yet. Please contact the site administrator.",
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
          subject: "New Contact Message from The Pack Hub",
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
            "Your message could not be sent. Please try again.",
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
    `w-full rounded-2xl border bg-white px-4 py-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#0084D1] focus:ring-4 focus:ring-[#0084D1]/10 ${errors[fieldName] ? "border-red-400" : "border-slate-200"}`;

  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f9fc] font-sans text-slate-800">
      <Breadcrumb title="contact" />

      <section className="relative isolate px-5 py-14 md:px-8 md:py-20">
        <div className="pointer-events-none absolute -left-40 top-10 -z-10 h-96 w-96 rounded-full bg-sky-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-96 w-96 rounded-full bg-blue-100/70 blur-3xl" />

        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-10 text-center md:mb-14"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0084D1] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#0084D1]" />
              We’re here to help
            </span>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-800 md:text-5xl">
              Contact us
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Have a question or need help? Send us a message and we’ll get back
              to you as soon as possible.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[0.88fr_1.12fr]">
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="overflow-hidden rounded-3xl border border-white bg-white p-3 shadow-[0_25px_90px_-35px_rgba(15,67,110,0.28)]"
            >
              <div className="relative h-[360px] overflow-hidden rounded-[1.25rem] bg-sky-50 sm:h-[440px] lg:h-full lg:min-h-[600px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3496.36927078621!2d77.07791730000001!3d28.7980676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1c305ac28ec7%3A0x3c3f8bbd3bfadd89!2sThe%20Pack%20Hub!5e0!3m2!1sen!2sin!4v1793258027358!5m2!1sen!2sin"
                  title="The Pack Hub location on Google Maps"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="absolute inset-0 h-full w-full"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/60 to-transparent p-5 pt-20">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/75">
                    Visit us
                  </p>
                  <p className="mt-1 text-lg font-bold text-white">
                    The Pack Hub · Bawana, New Delhi
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="rounded-3xl border border-white bg-white p-6 shadow-[0_25px_90px_-35px_rgba(15,67,110,0.28)] sm:p-8 md:p-10"
            >
              <div className="mb-7">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0084D1]">
                  Get in touch
                </p>
                <h2 className="mt-2 text-2xl font-black tracking-tight text-[#1A73E8] md:text-3xl">
                  Needs help? Let’s get in touch
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600 md:text-base">
                  We will get back to you as soon as possible. Your satisfaction
                  is our priority.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
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
                      htmlFor="firstName"
                      className="mb-2 block text-sm font-semibold text-slate-700"
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
                      placeholder="First name"
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
                      htmlFor="lastName"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Last name{" "}
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
                      placeholder="Last name"
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
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-slate-700"
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
                    htmlFor="phone"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Mobile number <span className="text-red-500">*</span>
                  </label>
                  <div
                    className={`flex w-full overflow-hidden rounded-2xl border bg-white transition focus-within:ring-4 focus-within:ring-[#0084D1]/10 ${errors.phone ? "border-red-400" : "border-slate-200 focus-within:border-[#0084D1]"}`}
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
                      aria-describedby={
                        errors.phone ? "phone-error" : undefined
                      }
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
                    htmlFor="message"
                    className="mb-2 block text-sm font-semibold text-slate-700"
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
                    placeholder="How can we help you?"
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message ? "message-error" : undefined
                    }
                    className={`${inputClass("message")} resize-y`}
                  />
                  <div className="mt-1.5 flex justify-between gap-3">
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
                  {isSubmitting ? "Sending message..." : "Send message"}
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
                <p className="text-center text-xs text-slate-400">
                  Fields marked with <span className="text-red-500">*</span> are
                  required.
                </p>
              </form>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3"
          >
            {contactDetails.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.55,
                  ease: "easeOut",
                  delay: index * 0.12,
                }}
                className="flex min-h-28 items-center gap-4 rounded-2xl border border-white bg-white/90 p-5 shadow-[0_15px_45px_-28px_rgba(15,67,110,0.3)] transition duration-300 hover:-translate-y-1"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#12b7e8] to-[#0084D1] text-white shadow-md shadow-sky-900/15">
                  <ContactIcon type={item.icon} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-slate-900">{item.title}</h3>
                  {item.lines.map((line, lineIndex) =>
                    item.href ? (
                      <a
                        key={line}
                        href={item.href[lineIndex]}
                        className="mt-1 block break-words text-sm leading-5 text-slate-500 transition hover:text-[#0084D1]"
                      >
                        {line}
                      </a>
                    ) : (
                      <p
                        key={line}
                        className="mt-1 text-sm leading-5 text-slate-500"
                      >
                        {line}
                      </p>
                    ),
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
