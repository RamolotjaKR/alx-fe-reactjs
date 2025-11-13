# Quick Start Guide - Recipe Sharing App

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. Navigate to the project directory:
```bash
cd c:\Users\kr14r\OneDrive\Desktop\React_vite\recipe-sharing-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

---

## Using the Application

### Adding a Recipe
1. On the home page, fill in the "Add a New Recipe" form
2. Enter a **Recipe Title** (required)
3. Enter a **Recipe Description** (required)
4. Click the **"Add Recipe"** button
5. Your recipe appears in the recipe list below

### Viewing Recipe Details
1. On the home page, click **"View Details"** on any recipe card
2. You'll see the full recipe information
3. Use the **"Back to Recipes"** button to return to the list

### Editing a Recipe
1. Go to the recipe details page
2. Click the **"Edit Recipe"** button
3. Modify the title and/or description
4. Click **"Save Changes"** to update
5. Click **"Cancel"** to discard changes

### Deleting a Recipe
1. Go to the recipe details page
2. Click the **"Delete Recipe"** button
3. Confirm the deletion in the popup dialog
4. You'll be returned to the home page

---

## Application Routes

| Route | Page | Purpose |
|-------|------|---------|
| `/` | Home | View all recipes and add new ones |
| `/recipe/:id` | Recipe Details | View, edit, or delete a specific recipe |

---

## Project Structure

```
src/
├── components/
│   ├── AddRecipeForm.jsx      - Form to add new recipes
│   ├── RecipeList.jsx          - Display all recipes
│   ├── RecipeDetails.jsx       - View recipe with edit/delete
│   ├── EditRecipeForm.jsx      - Edit existing recipes
│   ├── DeleteRecipeButton.jsx  - Delete action button
│   └── Home.jsx                - Main landing page
├── store/
│   └── recipeStore.js          - Zustand state management
├── App.jsx                     - Main app with routing
├── App.css                     - Styling
└── main.jsx                    - Entry point
```

---

## API Reference

### useRecipeStore Hook

```javascript
import useRecipeStore from '../store/recipeStore'

// Get all recipes
const recipes = useRecipeStore(state => state.recipes)

// Add a recipe
const addRecipe = useRecipeStore(state => state.addRecipe)
addRecipe({ id: Date.now(), title: 'Pizza', description: '...' })

// Update a recipe
const updateRecipe = useRecipeStore(state => state.updateRecipe)
updateRecipe(recipeId, { title: 'New Title', description: '...' })

// Delete a recipe
const deleteRecipe = useRecipeStore(state => state.deleteRecipe)
deleteRecipe(recipeId)

// Set all recipes (bulk operation)
const setRecipes = useRecipeStore(state => state.setRecipes)
setRecipes([...])
```

---

## Troubleshooting

### Port Already in Use
If port 5173 is already in use:
```bash
npm run dev -- --port 3000
```

### Module Not Found Errors
Make sure all dependencies are installed:
```bash
npm install
```

### Recipes Not Persisting on Refresh
Currently, recipes are stored in memory. To add persistence, implement:
- localStorage integration
- Backend API with database
- See IMPLEMENTATION_SUMMARY.md for future enhancements

---

## Building for Production

To create an optimized production build:
```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```

---

## Development Tips

- Use React DevTools browser extension for debugging
- Use Redux DevTools to inspect Zustand state
- The app will auto-reload when you save changes
- Check the browser console for error messages

---

## Support

For issues or questions, refer to:
- `IMPLEMENTATION_SUMMARY.md` - Detailed feature documentation
- `package.json` - Project dependencies and scripts
- Component files - Each has clear inline comments

---

Enjoy using the Recipe Sharing App! 🍳
