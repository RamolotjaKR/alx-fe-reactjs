import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

const RecommendationsList = () => {
  // Subscribe to recommendations and the generation function from the store
  const recommendations = useRecipeStore((state) => state.recommendations);
  const generateRecommendations = useRecipeStore(
    (state) => state.generateRecommendations
  );
  const favorites = useRecipeStore((state) => state.favorites);

  // Automatically generate recommendations whenever the favorites list changes
  // This ensures recommendations stay fresh and relevant to user preferences
  useEffect(() => {
    if (favorites.length > 0) {
      generateRecommendations();
    }
  }, [favorites, generateRecommendations]);

  if (recommendations.length === 0) {
    return (
      <div className="recommendations-container empty">
        <h2>💡 Recommended For You</h2>
        <p>Mark some recipes as favorites to get personalized recommendations!</p>
      </div>
    );
  }

  return (
    <div className="recommendations-container">
      <h2>💡 Recommended For You ({recommendations.length})</h2>
      <div className="recommendations-grid">
        {recommendations.map((recipe) => (
          <div key={recipe.id} className="recommendation-card">
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

export default RecommendationsList;
