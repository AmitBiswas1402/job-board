"use client";

import { restaurants } from "@/lib/resturants";
import { foodCategories } from "@/lib/foods";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Search = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const lowerQuery = query.toLowerCase();

  // Filter categories
  const filteredCategories = foodCategories.filter((category) =>
    category.name.toLowerCase().includes(lowerQuery)
  );

  // Filter restaurants
  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesRestaurant = restaurant.name
      .toLowerCase()
      .includes(lowerQuery);

    const matchesMenu = restaurant.menu.some((item) =>
      item.name.toLowerCase().includes(lowerQuery)
    );

    return matchesRestaurant || matchesMenu;
  });

  const hasResults = filteredCategories.length > 0 || filteredRestaurants.length > 0;

  return (
    <div>
      <Navbar />

      <div className="min-h-screen bg-gray-50 px-6 py-10">
        <div className="max-w-7xl mx-auto">
          {/* Search Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Search Results
            </h1>
            <p className="text-gray-600">
              Results for &quot;<span className="font-semibold">{query}</span>&quot;
            </p>
          </div>

          {!hasResults ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-500">
                No results found for &quot;{query}&quot;
              </p>
              <p className="text-gray-400 mt-2">Try searching for something else</p>
            </div>
          ) : (
            <>
              {/* Categories Section */}
              {filteredCategories.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Categories
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {filteredCategories.map((category) => (
                      <div
                        key={category.id}
                        className="flex flex-col items-center cursor-pointer group"
                      >
                        <div className="w-full aspect-square bg-white rounded-lg flex items-center justify-center mb-3 group-hover:shadow-lg transition overflow-hidden border border-gray-200">
                          <div className="text-5xl group-hover:scale-110 transition duration-300">
                            {category.image}
                          </div>
                        </div>
                        <p className="text-center text-sm font-medium text-gray-800 group-hover:text-orange-600 transition">
                          {category.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Restaurants Section */}
              {filteredRestaurants.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Restaurants
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRestaurants.map((restaurant) => (
                      <div
                        key={restaurant.id}
                        className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition"
                      >
                        <h2 className="text-xl font-semibold mb-2">
                          {restaurant.name}
                        </h2>

                        <p className="text-sm text-gray-600 mb-4">
                          ⭐ {restaurant.rating} • {restaurant.type}
                        </p>

                        <div className="border-t border-gray-200 pt-4">
                          <p className="text-sm font-medium text-gray-700 mb-2">
                            Menu Items:
                          </p>
                          {restaurant.menu.slice(0, 3).map((item) => (
                            <div
                              key={item.id}
                              className="flex justify-between text-sm py-1 text-gray-600"
                            >
                              <span>{item.name}</span>
                              <span className="font-medium">₹{item.price}</span>
                            </div>
                          ))}
                          {restaurant.menu.length > 3 && (
                            <p className="text-xs text-gray-400 mt-2">
                              +{restaurant.menu.length - 3} more items
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Search;