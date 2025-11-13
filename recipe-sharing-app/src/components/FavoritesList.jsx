import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

const FavoritesList = () => {
  // Get all recipes and favorite IDs from the store
  const recipes = useRecipeStore((state) => state.recipes);
  const favorites = useRecipeStore((state) => state.favorites);

  // Filter recipes to show only those that are in the favorites array
  const favoriteRecipes = recipes.filter((recipe) => favorites.includes(recipe.id));

  if (favoriteRecipes.length === 0) {
    return (
      <div className="favorites-container empty">
        <h2>❤️ My Favorites</h2>
        <p>No favorite recipes yet. Start adding your favorites!</p>
      </div>
    );
  }

  return (
    <div className="favorites-container">
      <h2>❤️ My Favorites ({favoriteRecipes.length})</h2>
      <div className="favorites-grid">
        {favoriteRecipes.map((recipe) => (
          <div key={recipe.id} className="favorite-card">
            <h3>{recipe.title}</h3>
            <p className="description">{recipe.description}</p>
            <Link to={`/recipe/${recipe.id}`} className="view-recipe-btn">
              View Recipe →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;
