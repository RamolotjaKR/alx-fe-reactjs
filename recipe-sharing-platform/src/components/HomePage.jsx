import { useState, useEffect } from 'react';
import recipeData from '../data.json';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Simulating data fetch from JSON file
    setRecipes(recipeData);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      {/* Header Section */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-gray-800 text-center">
            🍳 Recipe Sharing Platform
          </h1>
          <p className="text-center text-gray-600 mt-2">
            Discover and share amazing recipes from around the world
          </p>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Popular Recipes
        </h2>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
            >
              {/* Recipe Image */}
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-48 object-cover"
              />

              {/* Recipe Content */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {recipe.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {recipe.summary}
                </p>

                {/* View Recipe Button */}
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded transition duration-300">
                  View Recipe
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {recipes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No recipes available at the moment.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white mt-12 py-6 shadow-inner">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2025 Recipe Sharing Platform. Share your culinary creations!</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
