import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[75vh] items-center justify-center overflow-hidden bg-white px-4 py-16">
      {/* Soft background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#0084D1]/[0.07] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-sky-100/70 blur-3xl"
      />

      <section className="relative w-full max-w-2xl text-center">
        <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#0084D1]/[0.08] text-[#0084D1] shadow-sm ring-1 ring-[#0084D1]/10">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-10 w-10"
            aria-hidden="true"
          >
            <path
              d="M4 7.5h16l-1.5 13h-13L4 7.5Z"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinejoin="round"
            />
            <path
              d="M9 9V6a3 3 0 0 1 6 0v3"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
            <path
              d="m9.5 13 5 5m0-5-5 5"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#0084D1]">
          Page not found
        </p>

        <h1 className="mt-3 text-7xl font-black tracking-tight text-slate-900 sm:text-8xl">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          This page seems to have gone missing
        </h2>

        <p className="mx-auto mt-4 max-w-lg leading-7 text-slate-600">
          The link may be incorrect, or the page may have moved. Let’s get you
          back to our packaging products.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0084D1] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#0084D1]/20 transition hover:-translate-y-0.5 hover:bg-[#0073b8] focus:outline-none focus:ring-2 focus:ring-[#0084D1] focus:ring-offset-2"
          >
            Explore products
            <span aria-hidden="true">→</span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 transition hover:border-[#0084D1]/40 hover:bg-sky-50 hover:text-[#0084D1] focus:outline-none focus:ring-2 focus:ring-[#0084D1] focus:ring-offset-2"
          >
            Back to home
          </Link>
        </div>

        <div className="mx-auto mt-10 flex max-w-sm items-center justify-center gap-3 text-xs font-medium text-slate-400">
          <span className="h-px flex-1 bg-slate-200" />
          <span>The Pack Hub</span>
          <span className="h-px flex-1 bg-slate-200" />
        </div>
      </section>
    </main>
  );
}
