import { useState } from 'react';
import { useRecipeStore } from './recipeStore';

const AddRecipeForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const addRecipe = useRecipeStore((state) => state.addRecipe);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() && description.trim()) {
      addRecipe({
        title: title.trim(),
        description: description.trim(),
      });

      setTitle('');
      setDescription('');
      setSubmitted(true);

      // Clear success message after 3 seconds
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <div className="form-container">
      <h2>➕ Add New Recipe</h2>
      {submitted && <p className="success-message">✅ Recipe added successfully!</p>}
      <form onSubmit={handleSubmit} className="add-recipe-form">
        <div className="form-group">
          <label htmlFor="title">Recipe Title</label>
          <input
            id="title"
            type="text"
            placeholder="e.g., Chocolate Chip Cookies"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Describe your recipe... ingredients, steps, tips, etc."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="6"
            required
          ></textarea>
        </div>

        <button type="submit" className="submit-btn">
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;
