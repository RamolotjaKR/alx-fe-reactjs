import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import recipeData from '../data.json';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // Find the recipe with the matching ID
    const foundRecipe = recipeData.find((r) => r.id === parseInt(id));
    setRecipe(foundRecipe);
  }, [id]);

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Recipe Not Found</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded transition duration-300"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-orange-600 hover:text-orange-700 font-semibold transition duration-300"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Recipes
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Recipe Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-64 md:h-96 object-cover"
          />
          <div className="p-6 md:p-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              {recipe.title}
            </h1>
            <p className="text-lg text-gray-600 mb-6">{recipe.summary}</p>

            {/* Recipe Meta Information */}
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center bg-orange-100 px-4 py-2 rounded-full">
                <svg
                  className="w-5 h-5 mr-2 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="font-semibold">Prep: {recipe.prepTime}</span>
              </div>
              <div className="flex items-center bg-orange-100 px-4 py-2 rounded-full">
                <svg
                  className="w-5 h-5 mr-2 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                  />
                </svg>
                <span className="font-semibold">Cook: {recipe.cookTime}</span>
              </div>
              <div className="flex items-center bg-orange-100 px-4 py-2 rounded-full">
                <svg
                  className="w-5 h-5 mr-2 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="font-semibold">Servings: {recipe.servings}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ingredients and Instructions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ingredients Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <svg
                  className="w-6 h-6 mr-2 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                Ingredients
              </h2>
              <ul className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <li
                    key={index}
                    className="flex items-start text-gray-700 hover:text-orange-600 transition duration-200"
                  >
                    <svg
                      className="w-5 h-5 mr-3 mt-0.5 text-orange-500 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Instructions Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <svg
                  className="w-6 h-6 mr-2 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Instructions
              </h2>
              <ol className="space-y-6">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold mr-4">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 leading-relaxed pt-1">{instruction}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Call to Action */}
            <div className="mt-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg shadow-lg p-6 text-white text-center">
              <h3 className="text-2xl font-bold mb-2">Enjoyed this recipe?</h3>
              <p className="mb-4">Share it with your friends and family!</p>
              <button className="bg-white text-orange-600 hover:bg-gray-100 font-semibold py-2 px-6 rounded-full transition duration-300">
                Share Recipe
              </button>
            </div>
          </div>
        </div>
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

export default RecipeDetail;
