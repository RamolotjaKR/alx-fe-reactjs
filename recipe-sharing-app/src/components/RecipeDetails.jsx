import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecipeStore } from '../store/recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const recipe = useRecipeStore((state) =>
    state.recipes.find((r) => r.id === id)
  );

  if (!recipe) {
    return (
      <div className="recipe-details error">
        <h2>❌ Recipe Not Found</h2>
        <p>The recipe you're looking for doesn't exist.</p>
        <button onClick={() => navigate('/')} className="back-btn">
          ← Back to Home
        </button>
      </div>
    );
  }

  const handleEditSuccess = () => {
    setIsEditing(false);
  };

  const handleDeleteSuccess = () => {
    navigate('/');
  };

  return (
    <div className="recipe-details">
      {isEditing ? (
        <EditRecipeForm
          recipe={recipe}
          onSuccess={handleEditSuccess}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <button onClick={() => navigate('/')} className="back-btn">
            ← Back to Home
          </button>
          <div className="recipe-content">
            <h1>{recipe.title}</h1>
            <p className="full-description">{recipe.description}</p>
            <div className="recipe-meta">
              <small>Recipe ID: {recipe.id}</small>
            </div>
          </div>
          <div className="recipe-actions">
            <button
              onClick={() => setIsEditing(true)}
              className="edit-btn"
            >
              ✏️ Edit Recipe
            </button>
            <DeleteRecipeButton
              recipeId={recipe.id}
              onSuccess={handleDeleteSuccess}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default RecipeDetails;
