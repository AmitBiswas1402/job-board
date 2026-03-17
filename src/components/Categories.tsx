"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { foodCategories } from "@/lib/foods";

export default function Categories() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 5;

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + itemsPerView >= foodCategories.length ? 0 : prev + itemsPerView,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev - itemsPerView < 0
        ? Math.max(0, foodCategories.length - itemsPerView)
        : prev - itemsPerView,
    );
  };

  const handleCategoryClick = (categoryName: string) => {
    router.push(`/search?query=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="bg-white">
      {/* Categories Carousel Section */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-lg font-bold mb-4 text-gray-900">
          What&apos;s on your mind?
        </h2>

        {/* Carousel Container */}
        <div className="relative">
          {/* Previous Button */}
          {currentIndex > 0 && (
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition -ml-4"
            >
              <ChevronLeft className="w-5 h-5 text-gray-800" />
            </button>
          )}

          {/* Carousel Items */}
          <div className="overflow-hidden">
            <div
              className="flex gap-3 transition-transform duration-300"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              }}
            >
              {foodCategories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => handleCategoryClick(category.name)}
                  className="shrink-0 w-1/5 flex flex-col items-center cursor-pointer group"
                >
                  {/* Category Image/Icon */}
                  <div className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center mb-1.5 group-hover:shadow-sm transition overflow-hidden">
                    <div className="text-3xl group-hover:scale-110 transition duration-300">
                      {category.image}
                    </div>
                  </div>

                  {/* Category Name */}
                  <p className="text-center text-xs font-medium text-gray-800 group-hover:text-orange-600 transition leading-tight">
                    {category.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Next Button */}
          {currentIndex + itemsPerView < foodCategories.length && (
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition -mr-4"
            >
              <ChevronRight className="w-5 h-5 text-gray-800" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
