import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

const RecipeList = () => {
  // Subscribe to relevant parts of the Zustand store
  const recipes = useRecipeStore((state) => state.recipes);
  const searchTerm = useRecipeStore((state) => state.searchTerm);
  const favorites = useRecipeStore((state) => state.favorites);
  const addFavorite = useRecipeStore((state) => state.addFavorite);
  const removeFavorite = useRecipeStore((state) => state.removeFavorite);

  // Filter recipes based on search term (searches in title and description)
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (recipe.description && recipe.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Toggle favorite status for a recipe
  const toggleFavorite = (recipeId) => {
    if (favorites.includes(recipeId)) {
      removeFavorite(recipeId);
    } else {
      addFavorite(recipeId);
    }
  };

  return (
    <div className="recipe-list">
      <h2>📚 All Recipes ({filteredRecipes.length})</h2>
      {filteredRecipes.length === 0 ? (
        <p className="empty-message">
          {searchTerm ? 'No recipes match your search.' : 'No recipes yet. Add one to get started!'}
        </p>
      ) : (
        <div className="recipe-cards">
          {filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <div className="recipe-header">
                <h3>{recipe.title}</h3>
                <button
                  className={`favorite-btn ${favorites.includes(recipe.id) ? 'active' : ''}`}
                  onClick={() => toggleFavorite(recipe.id)}
                  title={favorites.includes(recipe.id) ? 'Remove from favorites' : 'Add to favorites'}
                >
                  {favorites.includes(recipe.id) ? '❤️' : '🤍'}
                </button>
              </div>
              <p className="description">{recipe.description}</p>
              <Link to={`/recipe/${recipe.id}`} className="view-details-btn">
                View Details →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;
