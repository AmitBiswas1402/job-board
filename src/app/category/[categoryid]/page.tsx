import { restaurants } from "@/lib/resturants";

interface Props {
  params: {
    categoryId: string;
  };
}

const FoodCategoryPage = ({ params }: Props) => {
  const categoryId = Number(params.categoryId);

  // Filter restaurants by category
  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.categories.includes(categoryId),
  );

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-8">
        Restaurants in Category {categoryId}
      </h1>

      {filteredRestaurants.length === 0 ? (
        <p>No restaurants found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="bg-gray-900 p-6 rounded-xl shadow-lg"
            >
              <h2 className="text-xl font-semibold mb-2">{restaurant.name}</h2>

              <p className="text-sm text-gray-400 mb-1">
                ⭐ {restaurant.rating}
              </p>

              <p className="text-sm text-gray-400 mb-4">
                Type: {restaurant.type}
              </p>

              <div className="border-t border-gray-700 pt-3">
                <p className="font-medium mb-2">Menu:</p>
                <ul className="space-y-1 text-sm">
                  {restaurant.menu.map((item) => (
                    <li key={item.id} className="flex justify-between">
                      <span>{item.name}</span>
                      <span>₹{item.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FoodCategoryPage;
