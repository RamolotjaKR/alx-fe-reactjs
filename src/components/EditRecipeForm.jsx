import { useState } from 'react';
import { useRecipeStore } from './recipeStore';

const EditRecipeForm = ({ recipe, onSuccess, onCancel }) => {
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const updateRecipe = useRecipeStore((state) => state.updateRecipe);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (title.trim() && description.trim()) {
      setSaving(true);
      setMessage('');

      // Simulate save delay
      setTimeout(() => {
        updateRecipe(recipe.id, {
          title: title.trim(),
          description: description.trim(),
        });

        setSaving(false);
        setMessage('✅ Recipe updated successfully!');

        // Call success callback after 1.5 seconds
        setTimeout(() => {
          onSuccess?.();
        }, 1500);
      }, 500);
    }
  };

  return (
    <div className="form-container edit-form">
      <h2>✏️ Edit Recipe</h2>
      {message && <p className="success-message">{message}</p>}
      <form onSubmit={handleSubmit} className="edit-recipe-form">
        <div className="form-group">
          <label htmlFor="edit-title">Recipe Title</label>
          <input
            id="edit-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="edit-description">Description</label>
          <textarea
            id="edit-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="6"
            required
          ></textarea>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            disabled={saving}
            className="save-btn"
          >
            {saving ? '💾 Saving...' : '💾 Save Changes'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            className="cancel-btn"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRecipeForm;
