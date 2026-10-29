"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export default function ProductImageGallery({ product }) {
  const images = Array.isArray(product?.images) ? product.images : [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoom, setZoom] = useState({
    x: 50,
    y: 50,
    active: false,
  });

  const touchStartX = useRef(null);
  const activeImage = images[activeIndex];

  function changeImage(index) {
    setActiveIndex(index);
    setZoom((current) => ({ ...current, active: false }));
  }

  function showPreviousImage() {
    changeImage(activeIndex === 0 ? images.length - 1 : activeIndex - 1);
  }

  function showNextImage() {
    changeImage(activeIndex === images.length - 1 ? 0 : activeIndex + 1);
  }

  function handleMouseMove(event) {
    // Keep zoom for mouse devices; touch uses swipe to change images.
    if (event.pointerType === "touch") return;

    const bounds = event.currentTarget.getBoundingClientRect();

    setZoom({
      x: ((event.clientX - bounds.left) / bounds.width) * 100,
      y: ((event.clientY - bounds.top) / bounds.height) * 100,
      active: true,
    });
  }

  function handleTouchStart(event) {
    touchStartX.current = event.touches[0].clientX;
  }

  function handleTouchEnd(event) {
    if (touchStartX.current === null || images.length < 2) return;

    const touchEndX = event.changedTouches[0].clientX;
    const swipeDistance = touchStartX.current - touchEndX;
    const minimumSwipeDistance = 45;

    if (Math.abs(swipeDistance) >= minimumSwipeDistance) {
      if (swipeDistance > 0) {
        showNextImage();
      } else {
        showPreviousImage();
      }
    }

    touchStartX.current = null;
    setZoom((current) => ({ ...current, active: false }));
  }

  if (!activeImage) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-3xl border border-slate-200 bg-gradient-to-br from-sky-50 to-white text-sm font-medium text-slate-500">
        No product image available
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Main image */}
      <div
        className="group relative aspect-square overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-sky-50 via-white to-blue-50 shadow-sm"
        onMouseMove={handleMouseMove}
        onMouseLeave={() =>
          setZoom((current) => ({ ...current, active: false }))
        }
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          key={activeImage.id || activeImage.url}
          src={activeImage.url}
          alt={activeImage.alt || product.name}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="pointer-events-none object-contain p-5 transition-transform duration-300 ease-out sm:p-8"
          style={{
            transform: zoom.active ? "scale(1.8)" : "scale(1)",
            transformOrigin: `${zoom.x}% ${zoom.y}%`,
          }}
        />

        {/* Image count */}
        {images.length > 1 && (
          <span className="absolute right-4 top-4 rounded-full border border-white/80 bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur">
            {activeIndex + 1} / {images.length}
          </span>
        )}

        {/* Previous / next buttons: hidden on mobile */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={showPreviousImage}
              aria-label="Show previous image"
              className="absolute left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-slate-200 bg-white/95 text-slate-700 shadow-md transition hover:scale-105 hover:text-[#0084D1] focus:outline-none focus:ring-2 focus:ring-[#0084D1] sm:grid"
            >
              <span aria-hidden="true" className="text-2xl leading-none">
                ‹
              </span>
            </button>

            <button
              type="button"
              onClick={showNextImage}
              aria-label="Show next image"
              className="absolute right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-slate-200 bg-white/95 text-slate-700 shadow-md transition hover:scale-105 hover:text-[#0084D1] focus:outline-none focus:ring-2 focus:ring-[#0084D1] sm:grid"
            >
              <span aria-hidden="true" className="text-2xl leading-none">
                ›
              </span>
            </button>
          </>
        )}

        <span className="pointer-events-none absolute bottom-4 left-1/2 hidden -translate-x-1/2 rounded-full bg-slate-900/70 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow transition-opacity group-hover:opacity-100 sm:block">
          Move over image to zoom
        </span>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-800">
              Product images
            </p>
            <p className="text-xs text-slate-500">Select an image to preview</p>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2">
            {images.map((image, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={image.id || image.url || index}
                  type="button"
                  onClick={() => changeImage(index)}
                  aria-label={`Show image ${index + 1} of ${product.name}`}
                  aria-pressed={isActive}
                  className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 bg-white transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#0084D1] focus:ring-offset-2 sm:h-24 sm:w-24 ${
                    isActive
                      ? "border-[#0084D1] shadow-[0_0_0_3px_rgba(0,132,209,0.12)]"
                      : "border-slate-200 hover:border-sky-300"
                  }`}
                >
                  <Image
                    src={image.url}
                    alt={image.alt || `${product.name} image ${index + 1}`}
                    fill
                    sizes="96px"
                    className="object-contain p-2 transition-transform duration-300 hover:scale-105"
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
