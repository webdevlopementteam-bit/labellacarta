import Image from "next/image";

const audiences = [
  { title: "For Industry", image: "/home/for-industry.webp" },
  { title: "For Distributor", image: "/home/for-distributor.webp" },
  { title: "For Confectioners", image: "/home/for-confectioners.webp" },
];

export default function AudienceAccordionSection() {
  return (
    <section className="w-full overflow-hidden bg-white">
      {/* Panels widen on hover (desktop) and stack on mobile */}
      <div className="flex h-[600px] flex-col md:h-[450px] md:flex-row">
        {audiences.map((item) => (
          <div
            key={item.title}
            className="group relative flex-1 overflow-hidden transition-[flex-grow] duration-500 ease-out hover:flex-[3]"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 transition-colors duration-500 group-hover:bg-black/25" />
            <div className="relative z-10 flex h-full items-center justify-center px-4">
              <h2 className="text-center text-2xl font-bold text-white drop-shadow-md sm:text-3xl">
                {item.title}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
