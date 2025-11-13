import { useState } from 'react';
import { useRecipeStore } from './recipeStore';

const DeleteRecipeButton = ({ recipeId, onSuccess }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this recipe? This action cannot be undone.')) {
      setIsDeleting(true);

      // Simulate delete delay
      setTimeout(() => {
        deleteRecipe(recipeId);
        setIsDeleting(false);
        onSuccess?.();
      }, 500);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="delete-btn"
      title="Delete this recipe"
    >
      {isDeleting ? '🗑️ Deleting...' : '🗑️ Delete Recipe'}
    </button>
  );
};

export default DeleteRecipeButton;
