import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

const RecommendationsList = () => {
  const recommendations = useRecipeStore((state) => state.recommendations);
  const generateRecommendations = useRecipeStore(
    (state) => state.generateRecommendations
  );
  const favorites = useRecipeStore((state) => state.favorites);

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
