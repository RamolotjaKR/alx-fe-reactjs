import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);

  return (
    <div className="recipe-list">
      <h2>📚 All Recipes ({recipes.length})</h2>
      {recipes.length === 0 ? (
        <p className="empty-message">No recipes yet. Add one to get started!</p>
      ) : (
        <div className="recipe-cards">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <h3>{recipe.title}</h3>
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
